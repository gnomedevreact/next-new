"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import { useForm } from "react-hook-form";

import { errorCatch } from "@/api/error";
import { useAuthMutations } from "@/hooks/useAuthMutations";
import { emailPattern } from "@/regexp/email.regExp";
import { AuthService } from "@/services/auth.service";
import { Button } from "@/shared/Button/Button";
import { IFormData } from "@/types/auth.types";
import { useQuery } from "@tanstack/react-query";

import styles from "./Auth.module.scss";

export const Auth = () => {
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    mode: "onChange",
  });
  const {
    mutateLogin,
    mutateRegister,
    isPendingLogin,
    isPendingRegister,
    errorLogin,
    errorRegister,
  } = useAuthMutations();
  const [isLogin, setIsLogin] = useState(false);

  const onSubmit = (data: IFormData) => {
    console.log(data);
    isLogin ? mutateLogin(data) : mutateRegister(data);
    reset();
  };

  return (
    <main className={styles.wrap}>
      <section>
        <div>
          <h1>{isLogin ? "Login" : "Sign In"}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: {
                    message: "email is required",
                    value: true,
                  },
                  pattern: {
                    message: "please enter correct email address",
                    value: emailPattern,
                  },
                })}
              />
              {errors.email?.message && (
                <span className={"text-black"}>{errors.email.message}</span>
              )}
            </label>
            <label>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: {
                    message: "password is required",
                    value: true,
                  },
                  maxLength: {
                    message:
                      "password length should be less than 50 characters",
                    value: 50,
                  },
                  minLength: {
                    message:
                      "password length should be longer than 6 characters",
                    value: 6,
                  },
                })}
              />
              {errors.password?.message && (
                <span className={"text-black"}>{errors.password.message}</span>
              )}
            </label>
            <div>
              <div
                className={"w-full flex items-center justify-center text-black"}
              >
                {isLogin && errorLogin ? (
                  <span>{errorCatch(errorLogin)}</span>
                ) : errorRegister && !isLogin ? (
                  <span>{errorCatch(errorRegister)}</span>
                ) : null}
              </div>
              <Button
                classNames={"w-full"}
                disabled={isLogin ? isPendingLogin : isPendingRegister}
              >
                Continue
              </Button>
              <GoogleButton
                onClick={() => replace("http://localhost:7000/api/auth/google")}
              />
              <div className="w-full flex items-end justify-end py-2">
                <span
                  className="cursor-pointer"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign In" : "Login"}
                </span>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};
