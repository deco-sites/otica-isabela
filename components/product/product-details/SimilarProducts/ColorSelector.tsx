// ColorSelector.tsx
import type { ColorSelectorProps } from "./types.ts";

const ColorSelector = ({
    colorVariants,
    selectedVariant,
    onColorClick,
    onColorHover,
    onColorLeave,
    similar,
}: ColorSelectorProps) => {
    return (
        <div className="flex gap-1 mt-2 max-lg:ml-5">
            {colorVariants.map((color) => {
                const isSelected = selectedVariant?.name === color.name;
                const wasCurrentColor = color.name === similar.value &&
                    !selectedVariant;
                const gradientColors = color.colorCode
                    .filter((code) => code.unitCode)
                    .map((code) => code.unitCode);

                return (
                    <div
                        key={color.name}
                        className={`group cursor-pointer ${
                            isSelected || wasCurrentColor
                                ? "ring-1 ring-offset-2 ring-[#aaa] rounded-full mr-1"
                                : ""
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            onColorClick(color);
                        }}
                        onMouseEnter={() => onColorHover(color)}
                        onMouseLeave={() => {
                            if (!isSelected) onColorLeave();
                        }}
                        title={color.name}
                    >
                        <div
                            style={{
                                background: gradientColors.length > 1
                                    ? `linear-gradient(${
                                        gradientColors.join(", ")
                                    })`
                                    : gradientColors[0],
                            }}
                            className="mask mask-circle h-4 w-4 bg-secondary hover:scale-125 transition-transform"
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ColorSelector;
