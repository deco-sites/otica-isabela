// import { useSignal } from "@preact/signals";
import Icon from "./ui/Icon.tsx";

export default function () {
	// const zoom = useSignal(0);

	return (
		<>
			<label for="alertas" class="flex items-center gap-2 cursor-pointer">
				<svg
					width="26"
					height="26"
					viewBox="0 0 26 26"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#clip0_5714_12056)">
						<path
							d="M12 11.8354V8.93295C12.0347 8.62197 12.3329 8.00002 13.2485 8.00002C14.164 8.00002 14.4623 8.62197 14.4969 8.93295V9.5549C14.4969 9.6694 14.5898 9.76222 14.7043 9.76222H17.6181C17.7915 9.76222 18.1383 9.90734 18.1383 10.4878C18.1383 11.0683 17.7915 11.2134 17.6181 11.2134H14.7043C14.5898 11.2134 14.4969 11.3063 14.4969 11.4208V13.2866C14.4969 13.4011 14.5898 13.494 14.7043 13.494H17.6181C17.8956 13.4594 18.5129 13.5561 18.7625 14.2196C19.0122 14.883 19.2134 15.4635 19.2827 15.6708"
							stroke="#007AB3"
							stroke-linecap="round"
						/>
						<ellipse
							cx="13.2021"
							cy="5.34758"
							rx="1.35251"
							ry="1.34757"
							stroke="#007AB3"
						/>
						<path
							d="M19.7128 17.0244L20.233 18.2683C20.3023 18.5101 20.0483 19.0354 19.549 19.2012C18.9247 19.4085 18.7166 19.2012 18.5086 18.7866C18.3421 18.4549 17.815 16.9898 17.5722 16.2988C17.4682 16.0569 17.0312 15.5731 16.1157 15.5731C15.2001 15.5731 13.6534 15.5731 12.9945 15.5731C12.6477 15.5386 11.9541 15.2622 11.9541 14.4329C11.9541 13.6036 11.9541 13.2581 11.9541 13.189"
							stroke="#007AB3"
							stroke-linecap="round"
						/>
						<path
							d="M15.8064 18.7841C14.8825 19.8164 13.5399 20.466 12.0456 20.466C9.25899 20.466 7 18.207 7 15.4204C7 13.0427 8.64465 11.0492 10.8584 10.5153"
							stroke="#007AB3"
							stroke-linecap="round"
						/>
						<circle cx="13" cy="13" r="12" stroke="#007AB3" />
					</g>
					<defs>
						<clipPath id="clip0_5714_12056">
							<rect width="26" height="26" fill="white" />
						</clipPath>
					</defs>
				</svg>

				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12.0001 16.75C11.801 16.7509 11.61 16.6716 11.4701 16.53L3.47009 8.53C3.19473 8.23449 3.20286 7.77399 3.48847 7.48838C3.77408 7.20277 4.23458 7.19464 4.53009 7.47L12.0001 14.94L19.4701 7.47C19.7656 7.19464 20.2261 7.20277 20.5117 7.48838C20.7973 7.77399 20.8054 8.23449 20.5301 8.53L12.5301 16.53C12.3902 16.6716 12.1992 16.7509 12.0001 16.75Z"
						fill="#007AB3"
					/>
				</svg>
			</label>
			<div class="absolute top-full right-0 hidden peer-checked:group-[]:flex flex-col gap-2 bg-[#E5F7FF] rounded p-3">
				{
					/* <div class="flex items-center gap-2">
					<label class="whitespace-nowrap" for="zoom">
						Ajustar zoom
					</label>
					<input
						type="text"
						id="zoom"
						class="text-grayscale-600 max-w-20 rounded outline-0"
						value={`${zoom.value}%`}
						onInput={(e) => {
							const input = e.target as HTMLInputElement;

							// Is weird but it works
							if (
								input.value.length &&
								input.value.length ===
									zoom.value.toString().length
							) {
								input.value = input.value.slice(0, -1);
							}

							const value = Number(
								input.value.replace(/\D/g, ""),
							);

							if (value <= 100) {
								zoom.value = value;
							}

							input.value = `${zoom.value}%`;
							// document.body.style.zoom = `${100 + zoom.value}%`
						}}
					/>
				</div> */
				}
				<div class="flex items-center gap-2">
					<input
						type="checkbox"
						id="grayscale"
						class="peer hidden"
						onInput={(e) => {
							if (e.currentTarget.checked) {
								document.body.style.filter = "grayscale(1)";
							} else {
								document.body.style.removeProperty("filter");
							}
						}}
					/>

					<div class="whitespace-nowrap">Escala de cinza</div>

					<label
						for="grayscale"
						class="bg-grayscale-600 border border-grayscale-500 rounded-3xl h-6 relative group/grayscale w-16 cursor-pointer"
					>
						<div class="size-4 rounded-full bg-slot-primary-50 flex justify-center items-center absolute top-1/2 -translate-y-1/2 left-1 peer-checked:group-[]/grayscale:bg-grayscale-0 peer-checked:group-[]/grayscale:size-6 peer-checked:group-[]/grayscale:left-[calc(100%-16px-12px)] transition-all">
							<Icon
								id="XMark"
								size={16}
								class="text-gray-700 opacity-0 peer-checked:group-[]/grayscale:opacity-100 transition-opacity"
							/>
						</div>
					</label>
				</div>
			</div>
		</>
	);
}
