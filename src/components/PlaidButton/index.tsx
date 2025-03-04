import { FC, useState, useEffect, useCallback } from 'react';
import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnExit,
} from 'react-plaid-link';
import { Button } from '../ui/button';
import { CircleCheckBig, LoaderCircle } from 'lucide-react';
import { getPlaidLinkToken, getPlaidAccessToken } from '@/client/plaid';

type PlaidButtonProps = {
  className: string;
  onConnectionSuccess: (accessToken: string) => void;
  isDisabled: boolean;
  isConnected: boolean;
}

const PlaidButton: FC<PlaidButtonProps> = ({ className, onConnectionSuccess, isDisabled, isConnected }) => {
  const [isConnecting, setConnectingStatus] = useState<boolean> (false);
  const [token, setToken] = useState<string | null>(null);
  
  const createLinkToken = async () => {
    // TODO @arecesj: If we go this approach,
    // then set the userSID as the client_user_id in the call body
    const response = await getPlaidLinkToken()
    const { link_token } = await response.json();
    setToken(link_token);
  };

  const exchangePublicToken = async (publicToken: string) => {
    const response = await getPlaidAccessToken(publicToken)
    
    const { access_token } = await response.json();
    setConnectingStatus(false)
    onConnectionSuccess(access_token)
  };
  
  const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken) => {
    exchangePublicToken(publicToken);
  }, []);

  const onExit: PlaidLinkOnExit = () => {
    setConnectingStatus(false)
  };

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
    onExit,
  });

  useEffect(() => {
    createLinkToken();
  }, []);

  return (
    <Button
      className={className}
      onClick={() => {
        setConnectingStatus(true)
        open()
      }}
      disabled={!ready || isConnecting || isDisabled || isConnected}
      >
      {isConnecting && (
        <LoaderCircle
          className="mr-3 h-5 w-5 animate-spin"
        />
      )}
      {isConnected ? (
        <>
          <CircleCheckBig 
            className="mr-3 h-5 w-5"
          />
          Connected
        </>
        ) : "Connect with Plaid"}
    </Button>
  )
}

export default PlaidButton;