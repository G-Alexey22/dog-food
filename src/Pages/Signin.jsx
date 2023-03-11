import { SigninForm } from "../Components/SigninForm/SigninForm";
import { Animation } from "../HOCs/Animation";

export function Signin() {
  const Animate = Animation(() => {
    return <SigninForm />;
  });
  return <Animate />;
}
