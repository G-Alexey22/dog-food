import { SignupForm } from "../Components/SignupForm/SignupForm";
import{Animation} from "../HOCs/Animation"

export function Signup() {
  const Animate = Animation(() => {
    return <SignupForm />;
  });
  return <Animate />;
}
