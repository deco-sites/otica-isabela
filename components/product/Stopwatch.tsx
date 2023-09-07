import Icon from "$store/components/ui/Icon.tsx";
import { calcRemainingTime } from "deco-sites/otica-isabela/sdk/calcRemainingTime.ts";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface ItemProps {
  label: string;
  value: number;
}

interface Props {
  targetDate: Date;
}

function StopwatchItem({ label, value }: ItemProps) {
  return (
    <div class="flex flex-col">
      <span id="days" class="text-red-500 font-bold">
        {value}
      </span>
      <span id="days" class="text-black text-xs font-bold">
        {label}
      </span>
    </div>
  );
}

function Stopwatch({ targetDate }: Props) {
  const timeRemaining = useSignal<number>(0);

  //toDo: remove this mock
  const now = new Date();
  const promotionalDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 10,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      timeRemaining.value = calcRemainingTime(promotionalDate);
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
      class="border border-red-500 rounded-md mr-6 ml-6 w-[90%]"
    >
      <div id="stopwatch-content" class="flex h-[60px]  rounded-md">
        <div
          id="stopwatch-icon"
          class="bg-red-500 w-[20%] rounded-md flex items-center justify-center"
        >
          <Icon id="Stopwatch" width={40} height={40} class="ml-2" />
        </div>
        <div id="stopwatch" class="w-[80%]">
          <span class="text-red-500 font-bold text-sm w-full block">
            Oferta termina em:
          </span>
          <div
            id="counter"
            class="flex w-[90%] justify-between mt-0 mb-0 ml-auto mr-auto"
          >
            <StopwatchItem label="Dias" value={days} />
            <StopwatchItem label="Horas" value={hours} />
            <StopwatchItem label="Minutos" value={minutes} />
            <StopwatchItem label="Segundos" value={seconds} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
