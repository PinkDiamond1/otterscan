import React from "react";
import AddressHighlighter from "./AddressHighlighter";
import DecoratedAddressLink from "./DecoratedAddressLink";
import { ResolvedAddresses } from "../api/address-resolver";
import { useSelectedTransaction } from "../useSelectedTransaction";
import { AddressContext } from "../types";

type TransactionAddressProps = {
  address: string;
  addressCtx?: AddressContext | undefined;
  resolvedAddresses: ResolvedAddresses | undefined;
};

const TransactionAddress: React.FC<TransactionAddressProps> = ({
  address,
  addressCtx,
  resolvedAddresses,
}) => {
  const txData = useSelectedTransaction();
  // TODO: push down creation coloring logic into DecoratedAddressLink
  const creation = address === txData?.confirmedData?.createdContractAddress;

  return (
    <AddressHighlighter address={address}>
      <DecoratedAddressLink
        address={address}
        addressCtx={addressCtx}
        miner={address === txData?.confirmedData?.miner}
        txFrom={address === txData?.from}
        txTo={address === txData?.to || creation}
        creation={creation}
        resolvedAddresses={resolvedAddresses}
      />
    </AddressHighlighter>
  );
};

export default TransactionAddress;