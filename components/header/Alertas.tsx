import { useSignal } from "@preact/signals";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useEffect } from "preact/hooks";
import type { AppContext } from "../../apps/site.ts";
import Accessibility from "../../islands/Accessibility.tsx";
import { clx } from "../../sdk/clx.ts";

/**
 * @titleBy text
 */
interface Text {
	/**
	 * @format html
	 * @title Texto
	 */
	text: string;
	/**
	 * @format html
	 * @title Texto
	 */
	textMobile: string;
	/**
	 * @title ‎
	 * @description Ícone da esquerda
	 */
	leftImage?: ImageWidget;
	/**
	 * @title ‎
	 * @description Ícone da direita
	 */
	rightImage?: ImageWidget;
}

interface Props {
	/**
	 * @format color
	 * @default #C0C0C0
	 */
	backgroundHex?: string;
	/**
	 * @title Textos
	 */
	texts: Text[];
	/**
	 * @title Intervalo entre cada texto (em segundos)
	 */
	interval: number;
}

export default function (
	{ backgroundHex, texts, interval, isMobile }: ReturnType<typeof loader>,
) {
	if (isMobile) return null;

	const current = useSignal(0);

	useEffect(() => {
		const timer = setInterval(() => {
			current.value = (current.value + 1) % texts.length;
		}, interval * 1_000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div
			style={{ background: `${backgroundHex}` }}
			class="h-12 w-full bg-[#E5F7FF]"
		>
			<div class="max-w-[1200px] w-[95%] flex justify-center items-center h-full relative mx-auto">
				<div class="relative w-full h-full max-w-[700px] flex sm:justify-center items-center">
					{texts.map((
						{ text, textMobile, leftImage, rightImage },
						i,
					) => (
						<div
							class={clx(
								"flex items-center transition-all duration-300 gap-0.5",
								i > 0 && "absolute",
								i !== current.value &&
									"opacity-0 pointer-events-none",
							)}
						>
							{leftImage && (
								<Image
									src={leftImage}
									alt=""
									width={24}
									height={24}
									class="hidden lg:block"
								/>
							)}

							<div
								dangerouslySetInnerHTML={{ __html: text }}
								class={clx(
									"text-grayscale-600 [&_a]:text-slot-primary-500 [&_a]:underline [&_a]:underline-offset-2 hidden lg:block",
								)}
							/>
							<div
								dangerouslySetInnerHTML={{ __html: textMobile }}
								class={clx(
									"text-grayscale-600 [&_a]:text-slot-primary-500 [&_a]:underline [&_a]:underline-offset-2 lg:hidden",
								)}
							/>

							{rightImage && (
								<Image
									src={rightImage}
									alt=""
									width={24}
									height={24}
									class="hidden lg:block"
								/>
							)}
						</div>
					))}
				</div>

				<input type="checkbox" id="alertas" class="peer hidden" />

				<div class="group absolute right-0 top-1/2 -translate-y-1/2 z-20">
					<Accessibility />
				</div>
			</div>
		</div>
	);
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
	return {
		...props,
		isMobile: ctx.device !== "desktop",
	};
}
