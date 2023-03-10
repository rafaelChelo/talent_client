import React from "react";
import {useRouter} from "next/router";
import {useWeb3React} from "@web3-react/core";

import Sidebar from "@shared/components/common/Sidebar";
import Navbar from "@shared/components/common/Navbar";
import {useAppDispatch, useAppSelector} from "@redux/store";
import {onConnectWallet, onShowTransaction} from "@redux/actions";
import ErrorCard from "@shared/components/common/ErrorCard";
import {SUPPORTED_CHAINS} from "@helpers/network";
import TransactionModal from "@shared/components/common/TransactionModal";
import {ethers} from "ethers";

interface Props {}

const Layout: React.FunctionComponent<Props> = ({children}) => {
  const router = useRouter();
  const isReturnRoute = router.route !== "/";
  const {connector, isActive, account, chainId} = useWeb3React();
  const {user} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const loadWallet = async () => {
    await dispatch(
      onConnectWallet({
        connection: connector,
        chainId,
        account,
      })
    );

    router.push("/dashboard");
  };

  React.useEffect(() => {
    if (isActive && ethers.utils.isAddress(account) && SUPPORTED_CHAINS.includes(chainId as any)) {
      loadWallet();
    }
  }, [isActive, account, chainId]);

  return (
    <div className={`${isReturnRoute ? "bg-stone-100" : "bg-neutral-50"} w-full`}>
      <div className="flex font-montserrat flex">
        {isReturnRoute && (
          <>
            <Navbar />
            <Sidebar />
          </>
        )}
        <div className="w-full bg-no-repeat relative min-h-screen">
          <ErrorCard classes={{root: "absolute top-0 right-0"}} />
          <div className={`z-50 relative h-full ${isReturnRoute && "md:px-36 sm:px-40 pt-20"}`}>
            {children}
          </div>
        </div>
      </div>
      <TransactionModal
        setShowModal={(arg: boolean) => dispatch(onShowTransaction(false))}
        showModal={user.transaction?.open}
        {...user.transaction.tx}
      />
    </div>
  );
};

export default Layout;
