export const metadata = {
  title: "New Issue",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="p-12">{children}</div>;
}
