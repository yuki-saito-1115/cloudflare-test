import type { Parent, Root, RootContent } from 'mdast';
import type { ContainerDirective } from 'mdast-util-directive';
import type {
  MdxJsxAttribute,
  MdxJsxAttributeValueExpression,
  MdxJsxFlowElement,
} from 'mdast-util-mdx-jsx';
import type { MdxjsEsm } from 'mdast-util-mdxjs-esm';
import { visit } from 'unist-util-visit';
import type { VFile } from 'vfile';

/**
 * ディレクティブ名とAstroコンポーネントのマッピング定義
 * ここで定義した名前が、MDXファイル内で使えるカスタムディレクティブになる。
 * 例: :::Container や :::Box など
 *
 */
type directiveComponentsType = {
  component: string; // Astroコンポーネント名
  path: string; // コンポーネントのパス
};

const directiveComponents: { [key: string]: directiveComponentsType } = {
  // Structures
  Container: {
    component: 'Container',
    path: '@components/structures/Container/Container.astro',
  },

  // Modules
  Box: {
    component: 'Box',
    path: '@modules/Box/Box.astro',
  },
};

/**
 * remarkプラグイン本体
 * このプラグイン（remarkCustomDirectives）は astro.config.mjs の中で読み込まれる。
 *
 * ASTツリーを走査し、カスタムディレクティブを対応するAstroコンポーネントに変換する。
 * 使われたコンポーネントのインポート文も自動で挿入する。
 */
export default function remarkCustomDirectives() {
  return (tree: Root, _file: VFile) => {
    /**
     * 使用されたコンポーネントを記録するSet
     * 重複インポートを防ぐため、Setで管理
     */
    const usedComponents = new Set<directiveComponentsType>();

    try {
      visit(
        tree,
        'containerDirective',
        (
          node: ContainerDirective,
          index: number | undefined,
          parent: Parent | undefined,
        ) => {
          const config =
            directiveComponents[node.name as keyof typeof directiveComponents];
          if (!config) {
            return;
          }

          usedComponents.add(config);

          /**
           * ディレクティブの属性をJSX属性に変換
           * 文字列はそのまま、オブジェクトや式はJSON文字列化して式として渡す
           */
          const attributes = node.attributes || {};

          const jsxAttributes: MdxJsxAttribute[] = Object.entries(
            attributes,
          ).map(([key, value]) => {
            if (typeof value === 'string') {
              return {
                type: 'mdxJsxAttribute',
                name: key,
                value: value,
              };
            } else {
              return {
                type: 'mdxJsxAttribute',
                name: key,
                value: {
                  type: 'mdxJsxAttributeValueExpression',
                  value: JSON.stringify(value),
                } as MdxJsxAttributeValueExpression,
              };
            }
          });

          /**
           * containerDirectiveノードをMDX JSXノードに変換
           * 対応するAstroコンポーネント名・属性・子要素をセット
           */
          const jsxNode: MdxJsxFlowElement = {
            type: 'mdxJsxFlowElement',
            name: config.component,
            attributes: jsxAttributes,
            children: node.children || [],
          };

          // ASTツリー上でノードを置換
          if (parent?.children && typeof index === 'number') {
            parent.children[index] = jsxNode as unknown as RootContent;
          }
        },
      );

      /**
       * 使用されたコンポーネントのインポート文をASTツリー先頭に追加
       * 1つでも使われていれば、import文を自動生成して挿入
       */
      if (usedComponents.size > 0) {
        const imports = Array.from(usedComponents).map(
          (config) =>
            ({
              type: 'mdxjsEsm',
              value: `import ${config.component} from '${config.path}';`,
              data: {
                estree: {
                  type: 'Program',
                  body: [
                    {
                      type: 'ImportDeclaration',
                      specifiers: [
                        {
                          type: 'ImportDefaultSpecifier',
                          local: { type: 'Identifier', name: config.component },
                        },
                      ],
                      source: { type: 'Literal', value: config.path },
                    },
                  ],
                },
              },
            }) as MdxjsEsm,
        ) as unknown as RootContent;

        tree.children.unshift(
          ...(Array.isArray(imports) ? imports : [imports]),
        );
      }
    } catch (error) {
      /**
       * 何かエラーが発生した場合はログ出力
       * 開発時のデバッグ用
       */
      console.error('Error in remarkCustomDirectives:', error);
    }
  };
}
