import type { SectionProps } from "$live/types.ts";
import { useSignal } from "@preact/signals";

export interface Category {
  /** @title Categoria */
  /** @description Descrição da categoria */
  label?: string;

  /** @title Identificador */
  /** @description Valor utilizado para ativar o texto cadastrado para a categoria selecionada. Use /feminino/* para exibir o texto na categoria "feminino" */
  matcher: string;

  /**
   * @title Texto a Exibir na Categoria
   * @format html
   */
  html?: string;
}

function CategoryText({ category }: SectionProps<ReturnType<typeof loader>>) {
  const isExpanded = useSignal(false);

  if (!category) {
    return null;
  }

  const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
  };

  const { html } = category;

  return (
    <>
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `
          #htmlCategoria h2 {
            margin: 0 0 10px 0;
            font-size: 28px;
            font-weight: 600;
            color: #000;
          }
          
          #htmlCategoria > article > .content h3 {
              margin: 15px 0 15px 0;
              font-size: 28px;
              font-weight: 500;
              color: #000;
          }
          
          #htmlCategoria > article > .content p {
              margin: 0 0 10px 0;
              font-size: 14px;
              line-height: 25px;
          }
          
          #htmlCategoria > article > .content h2 {
              margin: 15px 0 15px 0;
              font-size: 30px;
              font-weight: 500;
              color: #000;
          }
          
          #htmlCategoria h2 > span {
              font-family: roboto;
              font-size: 14pt;
          }
          
          #htmlCategoria > article > .content a {
              text-decoration: underline;
          }
          
          #htmlCategoria > article > .content ul {
              margin: 0 0 0 20px;
              padding: 10px 0 20px 20px;
              list-style-type: disc !important;
              list-style: disc !important;
          }
          
          #htmlCategoria > article > .content ul > li {
              margin: 0 0 10px 0;
              font-size: 14px;
              list-style-type: disc !important;
              list-style: disc !important;
          }
          
          #htmlCategoria li::marker {
              unicode-bidi: isolate;
              font-variant-numeric: tabular-nums;
              text-transform: none;
              text-indent: 0px !important;
              text-align: start !important;
              text-align-last: start !important;
          }
          `,
        }}
      />
      <div class="max-w-[1320px] mx-auto w-[95%] my-8 contentTextSeo">
        {!!html && (
          <>
            <div
              dangerouslySetInnerHTML={{ __html: html }}
              style={{
                overflow: "hidden",
                maxHeight: isExpanded.value ? "none" : 250,
              }}
            />
            <button
              class="bg-black text-white px-[20px] py-[10px] text-xs mt-4 rounded-[5px]"
              onClick={toggleExpand}
            >
              {isExpanded.value ? "Ver menos" : "Ver mais"}
            </button>
          </>
        )}
      </div>
    </>
  );
}

export interface Props {
  /** @title Categorias */
  categories?: Category[];
}

export const loader = ({ categories = [] }: Props, req: Request) => {
  const category = categories.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { category };
};

export default CategoryText;
