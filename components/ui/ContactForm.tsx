import { useEffect } from "preact/hooks";

export default function () {
  return (
    <div>
      <input id="phone" type="tel"></input>
      <link rel="stylesheet" href="/intl-tel-input/intlTelInput.min.css"></link>
      <script src="/intl-tel-input/intlTelInput.min.js"></script>
      <style
        dangerouslySetInnerHTML={{
          __html: `.iti__flag {background-image: url("/intl-tel-input/flags.png");}`,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          setTimeout(() => {
              intlTelInput(document.querySelector("#phone"), {
                initialCountry: "us",
                utilsScript: "/intl-tel-input/utils.js",
              });
      
              console.log('done')
            
          }, 0);
      `,
        }}
      ></script>
    </div>
  );
}
