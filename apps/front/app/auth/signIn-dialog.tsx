import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import SignInForm from './signIn-form';

interface Props {
  visible: boolean;
  changeVisible: (visible: boolean) => void;
}

const SigInDialog = ({ visible, changeVisible }: Props) => {
  return (
    <Dialog open={visible} onOpenChange={changeVisible}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>SigIn</DialogTitle>
          <DialogDescription>
            It is not yet open for public registration
          </DialogDescription>
        </DialogHeader>

        <SignInForm onSuccess={() => changeVisible(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default SigInDialog;
