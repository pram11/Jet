import React, { useState, useEffect } from 'react';

const SignInForm: React.FC<SignInFormProps> = (props: SignInFormProps) => {
  // id and password are the state variables
  // setID and setPassword are the functions that update the state variables
  const [id, setID] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect is a hook that runs when the component is mounted
  useEffect(() => {}, []);

  // handleIDChange is a function that updates the id state variable
  const handleIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setID(event.target.value);
  };
  // handlePasswordChange is a function that updates the password state variable
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // handleSubmit is a function that is called when the form is submitted
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
  };

  return (
    <div>
      <h1>{props['translation']['jet-label']}</h1>
      <form onSubmit={handleSubmit}>
        <div className="signin-form-wrapper">
          <div className="signin-input-wrapper">
            <div className="signin-label-wrapper">
              <label className="signin-label" htmlFor="sign-in-handle">
                Handle:
              </label>
            </div>
            <input
              className="signin-input"
              id="sign-in-handle"
              type="text"
              value={id}
              onChange={handleIDChange}
            />
          </div>
          <div className="signin-input-wrapper">
            <div className="signin-label-wrapper">
              <label className="signin-label" htmlFor="sign-in-password">
                Password:
              </label>
            </div>
            <input
              className="signin-input"
              id="sign-in-password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        <input className="signin-submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};
export default SignInForm;
