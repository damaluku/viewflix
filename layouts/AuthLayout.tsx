type Props = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default AuthLayout;
