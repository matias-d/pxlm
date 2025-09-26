interface Props {
  loading: boolean;
}

export default function LoadingTop({ loading }: Props) {
  if (!loading) return null;

  return <div className="loading-bar z-50"></div>;
}
