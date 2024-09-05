import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { LoginFormControlls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md spacce-y-6 ">
      <div className="text-center">
        <h1 className="tetx-3xl font-bold tracking-tight text-foreground">
          Login to Your Account
        </h1>
        <p className="mt-2 text-sm">
          Don't have an account ?
          <Link
            className="font-medium ml-2 text-primary hover:underline "
            to="/auth/signup"
          >
            Sign Up
          </Link>
        </p>
      </div>

      <CommonForm
        formControlles={LoginFormControlls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthLogin;
