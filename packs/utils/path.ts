import { Account } from "$store/packs/accounts/configStore.ts";

export const paths = ({ token, publicUrl }: Account) => {
  const searchBaseUrl = `${publicUrl}/Api`;

  return {
    session: {
      initSession: () => `${searchBaseUrl}/InicioSessao?token=${token}`,
    },
  };
};
