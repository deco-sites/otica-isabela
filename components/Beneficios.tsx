import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../sdk/clx.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "site/sdk/useId.ts";

/**
 * @titleBy text
 */
export interface Benefit {
	/**
	 * @title ‎
	 * @description Ícone
	 */
	icon: ImageWidget;
	/**
	 * @title Texto
	 */
	text: string;
	/**
	 * @format html
	 */
	popup?: string;
}

interface Props {
	benefits: Benefit[];
	/**
	 * @ignore
	 */
	noMargin?: boolean;
	/**
	 * @hide
	 */
	isMobile?: boolean;
}

export default function ({ benefits, noMargin, isMobile }: Props) {
	const id = useId();

	if (isMobile) {
		return (
			<div class="relative lg:hidden" id={id}>
				<Slider class="carousel carousel-center w-screen gap-0 scrollbar-none">
					{benefits.map((benefit, index) => (
						<Slider.Item
							index={index}
							class="carousel-item !w-[unset] border-r-[1px] border-solid border-slot-primary-500"
						>
							<div class="group relative w-auto py-0 ">
								<div class="flex items-center justify-center md:justify-start gap-2 px-7 h-9">
									<Image
										src={benefit.icon}
										alt={benefit.text}
										width={24}
										height={24}
										class="text-slot-primary-500"
									/>
									<span class="text-center text-grayscale-700">
										{benefit.text}
									</span>
								</div>
							</div>
						</Slider.Item>
					))}
				</Slider>
				<div class="flex  w-full justify-center items-center gap-x-4 mt-5">
					{benefits?.map((_, index) => {
						return <Slider.Dot index={index} />;
					})}
				</div>

				<SliderJS rootId={id} interval={5 * 1e3} />
			</div>
		);
	}
	return (
		<div
			class={clx(
				"hidden lg:flex flex-col md:flex-row bg-grayscale-0 rounded-[48px] mx-auto w-5/6 md:w-[calc(100%-12px)] max-w-[1240px] md:h-16 py-3.5 md:px-4 items-center justify-center md:divide-x divide-y md:divide-y-0 divide-slot-primary-500 shadow-[0_2px_10px_rgba(0,0,0,0.15)]",
				!noMargin && "mb-16 lg:mb-20",
			)}
		>
			{benefits.map((benefit) => (
				<div class="group relative w-5/6 md:w-auto py-7 md:py-0">
					<div class="flex items-center justify-center md:justify-start gap-2 px-4 h-9">
						<Image
							src={benefit.icon}
							alt={benefit.text}
							width={24}
							height={24}
							class="text-slot-primary-500"
						/>
						<span class="text-center text-grayscale-700">
							{benefit.text}
						</span>
					</div>

					{benefit.popup && benefit.popup !== "<p></p>" && (
						<div class="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center justify-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-[200px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
							<div
								class="bg-grayscale-0 rounded p-1.5 text-xs leading-5 text-center text-grayscale-600 [&_a]:text-slot-primary-500 [&_a]:underline [&_a]:underline-offset-2"
								dangerouslySetInnerHTML={{
									__html: benefit.popup,
								}}
							/>
							<div class="triangle" />
						</div>
					)}
				</div>
			))}
		</div>
	);
}
