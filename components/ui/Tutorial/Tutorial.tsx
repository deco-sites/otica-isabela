import Step, { Props as StepProps, } from "$store/components/ui/Tutorial/Step.tsx";
import { type FnContext } from "@deco/deco";
interface Colors {
    /**
     * @format color
     * @default #2f3136
     */
    icon: string;
    /**
     * @format color
     * @default #f3f4f4
     */
    cardsBackground: string;
}
interface Spacing {
    /**
     * @default true
     */
    container: boolean;
    /**
     * @default 12
     */
    betweenTextAndCards: number;
    /**
     * @default 12
     */
    betweenCards: number;
    /**
     * @default 12
     */
    betweenIconAndContent: number;
}
interface Props {
    /**
     * @format html
     * @default <p>Header</p>
     */
    header: string;
    steps: StepProps[];
    colors: Colors;
    spacing: Spacing;
}
export function loader(props: Props, _req: Request, ctx: FnContext) {
    return { ...props, isMobile: ctx.device === "mobile" };
}
const step: StepProps = {
    header: "<h3>Step</h3>",
    text: "<p>Content</p>",
    icon: {
        id: "Bulb",
        size: 24,
        strokeWidth: 2,
        verticalAlign: "middle",
    },
    isMobile: false,
};
export default function Tutorial({ header = "<h2 style='font-weight:bold;font-size:24px;'>Header</h2>", steps = [step, step, step], colors = { cardsBackground: "#f3f4f4", icon: "#2f3136" }, spacing = {
    betweenCards: 32,
    betweenIconAndContent: 24,
    betweenTextAndCards: 32,
    container: true,
}, isMobile = false, }: ReturnType<typeof loader>) {
    const { betweenTextAndCards, betweenCards, betweenIconAndContent, container, } = spacing;
    const { icon, cardsBackground } = colors;
    return (<div class={"flex flex-col p-5 md:p-0" + (container ? " container" : "")} style={{
            "--card-gap": `${betweenIconAndContent}px`,
            "--icon-color": icon,
        }}>
      <div dangerouslySetInnerHTML={{ __html: header }}/>
      <ul class="flex flex-col gap-[var(--card-gap)] p-5 md:p-10" style={{
            gap: `${betweenCards}px`,
            backgroundColor: cardsBackground,
            marginTop: `${betweenTextAndCards}px`,
        }}>
        {steps.map((step, index) => (<Step key={index} {...step} isMobile={isMobile}/>))}
      </ul>
    </div>);
}
