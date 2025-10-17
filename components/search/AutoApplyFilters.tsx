import { useEffect } from "preact/hooks";

interface Props {
    rootId: string;
}

const allowedRangeFilters = [
    "Altura da Lente",
    "Largura da Lente",
    "Largura da Ponte",
    "Frente Total",
];

function buildRangeFilterParams(rootElement: HTMLElement) {
    const url = new URL(window.location.href);

    // Manipular apenas os filtros de intervalo
    const rangeFilters =
        rootElement?.querySelectorAll("#range-filter-input-container") || [];

    rangeFilters?.forEach((filter) => {
        const label = filter?.getAttribute("data-input-label");
        const minInput = filter?.querySelector<HTMLInputElement>(
            `[data-input-item-min]`,
        );
        const maxInput = filter?.querySelector<HTMLInputElement>(
            `[data-input-item-max]`,
        );

        const min = minInput?.getAttribute("min");
        const max = maxInput?.getAttribute("max");
        const minValue = minInput?.getAttribute("value");
        const maxValue = maxInput?.getAttribute("value");

        if ((minValue && min !== minValue) || (maxValue && max !== maxValue)) {
            url.searchParams.set(`filter.${label!}`, `${minValue}:${maxValue}`);
        }
    });

    if (window.location.href !== url.href) {
        return url.href;
    }
}

function setup({ rootId }: Props) {
    const root = document.getElementById(rootId);

    // Set up listeners for range filter inputs
    function setupRangeFilterListeners() {
        const rangeFilters =
            root?.querySelectorAll("#range-filter-input-container") || [];

        rangeFilters?.forEach((filter) => {
            const minInput = filter?.querySelector<HTMLInputElement>(
                `[data-input-item-min]`,
            );
            const maxInput = filter?.querySelector<HTMLInputElement>(
                `[data-input-item-max]`,
            );

            const applyRangeFilter = () => {
                // Pequeno atraso para permitir atualizações da UI
                setTimeout(() => {
                    const url = buildRangeFilterParams(root!);
                    if (url) {
                        window.location.href = url;
                    }
                }, 500);
            };

            // Add change event listeners to the range inputs
            minInput?.addEventListener("change", applyRangeFilter);
            maxInput?.addEventListener("change", applyRangeFilter);

            // Also listen for the mouseup event for sliders
            minInput?.addEventListener("mouseup", applyRangeFilter);
            maxInput?.addEventListener("mouseup", applyRangeFilter);

            // Touch events for mobile
            minInput?.addEventListener("touchend", applyRangeFilter);
            maxInput?.addEventListener("touchend", applyRangeFilter);
        });
    }

    // Configuração inicial dos filtros de intervalo
    setupRangeFilterListeners();

    // Configurar um observer de mutação para detectar quando novos filtros são adicionados
    const observer = new MutationObserver(() => {
        setupRangeFilterListeners();
    });

    if (root) {
        observer.observe(root, { childList: true, subtree: true });
    }

    // Cleanup when component unmounts
    return () => {
        observer.disconnect();
    };
}

function AutoApplyFilters({ rootId }: Props) {
    useEffect(() => {
        const cleanup = setup({ rootId });
        return cleanup;
    }, [rootId]);

    return <div data-auto-apply-filters-controller-js />;
}

export default AutoApplyFilters;
