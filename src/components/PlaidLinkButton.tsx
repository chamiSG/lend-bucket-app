import React, { useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
// import Button from "plaid-threads/Button";
import { useStateMachine } from "little-state-machine";
import { setPlaidLinkStatus } from "../state/store";
import { Button } from "@chakra-ui/react";
import axios from "../utils/api";

const PlaidLinkButton = () => {
  const { actions, state } = useStateMachine({ setPlaidLinkStatus });

  const onSuccess = React.useCallback(
    (public_token: string) => {
      // If the access_token is needed, send public_token to server
      const exchangePublicTokenForAccessToken = async () => {
        const response = await axios.post("/api/set_access_token", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: `public_token=${public_token}`,
        });
        if (!response) {
          actions.setPlaidLinkStatus({
            itemId: `no item_id retrieved`,
            accessToken: `no access_token retrieved`,
            isItemAccess: false,
          })
          return;
        }
        const data = await response.data;
        actions.setPlaidLinkStatus({
          itemId: data.item_id,
          accessToken: data.access_token,
          isItemAccess: true,
        })
      };

      // 'payment_initiation' products do not require the public_token to be exchanged for an access_token.
      if (state?.plaid?.isPaymentInitiation) {
        actions.setPlaidLinkStatus({
          isItemAccess: false,
        })
      } else {
        exchangePublicTokenForAccessToken();
      }
      actions.setPlaidLinkStatus({
        linkStatus: true
      })
      // window.history.pushState("", "", "/");
    },
    [actions, state]
  );

  let isOauth = false;
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: state?.plaid?.linkToken!,
    onSuccess,
  };

  if (window.location.href.includes("?oauth_state_id=")) {
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (isOauth && ready) {
      open();
    }
  }, [ready, open, isOauth]);

  return (
    <Button w={'full'} colorScheme='brand' onClick={() => open()} isDisabled={!ready || state?.plaid?.linkStatus}>
      {state?.plaid?.linkStatus ? "Connected" : "Connect Plaid"}
    </Button>
  );
};

PlaidLinkButton.displayName = "Link";

export default PlaidLinkButton;
