import { FC, useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';

type CanopyButtonProps = {
  className: string;
  isDisabled: boolean;
  isConnected: boolean;

}

const CanopyButton: FC<CanopyButtonProps> = ({ className, isDisabled, isConnected }) => {
  const [isConnecting, setConnectingStatus] = useState<boolean> (false);
  return (
    <Button
      className={className}
      onClick={() => {
        setConnectingStatus(true)
        // open()
      }}
      disabled={isConnecting || isDisabled || isConnected}
      >
      {isConnecting && (
        <LoaderCircle
          className="mr-3 h-5 w-5 animate-spin"
        />
      )}
      Connect with Canopy Connect
    </Button>
  )
}

export default CanopyButton