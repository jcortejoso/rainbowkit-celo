import type { Chain, Wallet } from "@rainbow-me/rainbowkit";
import { getWalletConnectConnector } from "@rainbow-me/rainbowkit";

import { Alfajores, Baklava, Celo } from "../chains";

export interface CeloWalletOptions {
  chains: Chain[];
}

export const CeloWallet = ({
  chains = [Alfajores, Baklava, Celo],
}: CeloWalletOptions): Wallet => ({
  id: "celo-wallet",
  name: "Celo Wallet",
  iconUrl:
    "https://rainbowkit-with-celo.vercel.app/icons/alfajores.svg",
  iconBackground: "#FFF",
  createConnector: () => {
    const connector = getWalletConnectConnector({
      chains,
    });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return uri;
        },
      },
      desktop: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return `celowallet://wc?uri=${encodeURIComponent(uri)}`;
        },
      },
    };
  },
});

export default CeloWallet;
