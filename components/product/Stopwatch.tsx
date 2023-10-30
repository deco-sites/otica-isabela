import Icon from "$store/components/ui/Icon.tsx";
import { calcRemainingTime } from "$store/sdk/calcRemainingTime.ts";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface ItemProps {
  label: string;
  value: number;
  type: "card" | "header";
}

interface Props {
  targetDate: Date;
  type: "card" | "header";
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
    "bold": "",
    "gap": "gap-2",
  },
  header: {
    "font-color": "text-white",
    "font-size": "text-2xl md:text-4xl",
    "offer-fs": "text-l md:text-xl",
    "bold": "font-bold",
    "gap": "gap-4",
  },
};

const style = (props: string[], type: Props["type"]) =>
  props.map((p) => config[type][p]).join(" ");

export function StopwatchItem({ label, value, type }: ItemProps) {
  return (
    <div class={`text-center ${style(["font-size"], type)}`}>
      <p
        id={`item-${label}-value`}
        class={`${style(["font-color"], type)} font-bold`}
      >
        {value}
      </p>
      <p
        id={`item-${label}-label`}
        class={`${style(["bold"], type)} text-black text-xs md:text-sm }`}
      >
        {label}
      </p>
    </div>
  );
}

function Stopwatch({ targetDate, type }: Props) {
  const timeRemaining = useSignal<number>(0);

  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      timeRemaining.value = calcRemainingTime(targetDate);
    }, 999);

    return () => {
      clearInterval(interval);
    };
  }, [targetDate]);

  const seconds = Math.floor((timeRemaining.value / 1000) % 60);
  const minutes = Math.floor((timeRemaining.value / 1000 / 60) % 60);
  const hours = Math.floor((timeRemaining.value / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeRemaining.value / (1000 * 60 * 60 * 24));

  return (
    <div
      class={`border border-red-500 rounded-md w-auto md:w-full max-w-[330px] self-center ${
        type === "card" ? "mb-2" : ""
      }`}
    >
      <div
        class={`flex rounded-md pt-0 pb-0`}
      >
        {type === "card" && (
          <div class="bg-red-500 text-white px-3 rounded-md flex items-center justify-center">
            <Icon id="Stopwatch" width={25} height={25} class="" />
          </div>
        )}
        <div class="w-full text-center my-0 mx-2.5">
          <p
            class={`${
              style(["font-color", "offer-fs", "bold"], type)
            } w-full block `}
          >
            Oferta termina em
          </p>
          <div
            class={`flex justify-between mt-0 mb-0 ml-auto mr-auto md:gap-0 ${
              style(["gap"], type)
            }`}
          >
            <StopwatchItem label="Dias" value={days} type={type} />
            <StopwatchItem label="Horas" value={hours} type={type} />
            <StopwatchItem label="Minutos" value={minutes} type={type} />
            <StopwatchItem label="Segundos" value={seconds} type={type} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
