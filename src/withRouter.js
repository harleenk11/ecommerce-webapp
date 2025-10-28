import { useParams } from "react-router-dom";

export default function withRouter(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
