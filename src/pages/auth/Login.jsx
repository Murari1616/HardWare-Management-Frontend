//@ts-nocheck
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import appLogo from '../../assets/images/appLogo.png';
import background from '../../assets/images/hardware-background.jpg'
import { login } from "@/redux/features/authSlice";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "@/redux/features/authSlice";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const response = await dispatch(login(data));
    if (response.payload.user) {
      toast({
        title: 'Success',
        description: "Login Successfull",
        variant: "success"
      });
      localStorage.getItem('owner') == 100 ? navigate('/app/rent-list') : navigate('/rules');
    } else {
      toast({
        title: "Error",
        variant: 'destructive',
        description: response.payload
      })

    }
    // handle login logic
  };

  return (
    <div className="flex lg:flex-row md:flex-row flex-col justify-center lg:gap-32 items-center relative w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <img
        src={appLogo}
        alt="Overlay"
        className="relative lg:w-auto lg:h-96 object-contain z-10 lg:mt-0 md:mt-0 mt-[-200px]"
      />
      <div className="backdrop-blur-sm bg-black/60 p-6 rounded-lg shadow-md lg:w-[30vw] max-h-fit flex flex-col gap-4">
        <Label className="text-3xl mb-2 text-center text-blue-400 w-full flex justify-center">Login</Label>

        <div>
          <Label className='text-gray-200 mb-1'>Email</Label>
          <Input {...register("email")} placeholder="Enter your email" className='text-white' />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label className='text-gray-200 mb-1'>Password</Label>
          <Input
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className='text-white'
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <Button onClick={handleSubmit(onSubmit)}>Login</Button>
      </div>
    </div>
  );
};

export default Login;
