import Icon from "$store/components/ui/Icon.tsx";
import { calcRemainingTime } from "deco-sites/otica-isabela/sdk/calcRemainingTime.ts";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export enum Size {
  card = "card",
  header = "header",
}

interface ItemProps {
  label: string;
  value: number;
  size: Size;
}

interface Props {
  targetDate: Date;
  size: Size;
}

type Config = {
  card: {
    [key: string]: string;
  };
  header: {
    [key: string]: string;
  };
};

const config: Config = {
  card: {
    "font-color": "text-red-500",
    "font-size": "text-sm",
    "offer-fs": "text-xs md:text-sm",
  },
  header: {
    "font-color": "text-white",
    "font-size": "text-2xl md:text-4xl",
    "offer-fs": "text-l md:text-xl",
  },
};

const style = (prop: string, size: Size) => config[size][prop];

export function StopwatchItem({ label, value, size }: ItemProps) {
  return (
    <div class={`text-center ${style("font-size", size)}`}>
      <p
        id={`item-${label}-value`}
        class={`${style("font-color", size)} font-bold`}
      >
        {value}
      </p>
      <p
        id={`item-${label}-label`}
        class={`text-black font-normal text-xxs md:text-sm }`}
      >
        {label}
      </p>
    </div>
  );
}

function Stopwatch({ targetDate, size }: Props) {
  const timeRemaining = useSignal<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      timeRemaining.value = calcRemainingTime(targetDate);
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

  const seconds = Math.floor((timeRemaining.value / 1000) % 60);
  const minutes = Math.floor((timeRemaining.value / 1000 / 60) % 60);
  const hours = Math.floor((timeRemaining.value / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeRemaining.value / (1000 * 60 * 60 * 24));

  return (
    <div
      id="stopwatch-container"
      class="border border-red-500 rounded-md  w-full max-w-[330px] self-center"
    >
      <div id="stopwatch-content" class="flex rounded-md">
        {size === Size.card && (
          <div
            id="stopwatch-icon"
            class="bg-red-500 rounded-md flex items-center justify-center"
          >
            <Icon id="Stopwatch" width={40} height={40} class="ml-2" />
          </div>
        )}
        <div id="stopwatch" class="w-full text-center mt-0 mb-0 ml-1 mr-1">
          <p
            class={`${style("font-color", size)} ${
              style(
                "offer-fs",
                size,
              )
            } font-bold w-full block `}
          >
            Oferta termina em
          </p>
          <div
            id="counter"
            class="flex justify-between mt-0 mb-0 ml-auto mr-auto"
          >
            <StopwatchItem label="Dias" value={days} size={size} />
            <StopwatchItem label="Horas" value={hours} size={size} />
            <StopwatchItem label="Minutos" value={minutes} size={size} />
            <StopwatchItem label="Segundos" value={seconds} size={size} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
