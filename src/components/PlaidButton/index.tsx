import { FC, useState, useEffect, useCallback } from 'react';
import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnExit,
} from 'react-plaid-link';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';

type PlaidButtonProps = {
  className: string;
  onConnectionSuccess: (accessToken: string) => void;
}

const PlaidButton: FC<PlaidButtonProps> = ({ className, onConnectionSuccess }) => {
  const [isConnecting, setConnectingStatus] = useState<boolean> (false);
  const [token, setToken] = useState<string | null>(null);
  
  const createLinkToken = async () => {
    // TODO: If we go this approach,
    // then set the userSID as the client_user_id in the call body
    const response = await fetch("/api/plaid/create_link_token", { method: 'POST' });
    const { link_token } = await response.json();
    setToken(link_token);
  };

  const exchangePublicToken = async (publicToken: string) => {
    const response = await fetch("/api/plaid/exchange_public_token", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_token: publicToken })
    });
    
    // TODO: store this in the context
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
      disabled={!ready || isConnecting}
      >
      {isConnecting && (
        <LoaderCircle
          className="mr-3 h-5 w-5 animate-spin"
        />
      )}
      Connect with Plaid
    </Button>
  )
}

export default PlaidButton;