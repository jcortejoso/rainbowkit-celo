import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWalletPlus } from "../wallets/metamask-with-fee-currency";
import {
  omniWallet,
  walletConnectWallet,
  coinbaseWallet,
  safeWallet,
  braveWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { Valora, CeloWallet } from "@celo/rainbowkit-celo/wallets";


import type { Chain } from "@rainbow-me/rainbowkit";

export default function connectors({
  chains,
  appName,
  projectId,
}: {
  chains: Chain[];
  projectId: string;
  appName?: string;
}) {
  return connectorsForWallets([
    {
      groupName: "Celo Only",
      wallets: [
        Valora({ chains, projectId }),
        CeloWallet({ chains, projectId }),
        metaMaskWalletPlus({ chains, projectId })
      ],
    },
    {
      groupName: "Supports Celo",
      wallets: [
        braveWallet({ chains }), // only shows when in brave and  celo chains are configured in brave wallet
        safeWallet({ chains }),
        omniWallet({ chains, projectId }),
        walletConnectWallet({ chains, projectId }),
      ].concat(appName ? [coinbaseWallet({ appName, chains })] : []),
    },
  ]);
}
