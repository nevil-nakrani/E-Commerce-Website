import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControlls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const AuthSignup = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          description: "Email has already taken ",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md spacce-y-6 ">
      <div className="text-center">
        <h1 className="tetx-3xl font-bold tracking-tight text-foreground">
          Create New Account
        </h1>
        <p className="mt-2 text-sm">
          Already have an account ?
          <Link
            className="font-medium ml-2 text-primary hover:underline "
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>

      <CommonForm
        formControlles={registerFormControlls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthSignup;
