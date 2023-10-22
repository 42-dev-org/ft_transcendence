import ExampleFooter from "../../layouts/example/example-footer/example-footer";
import ExampleMain from "../../layouts/example/example-main/example-main";
import ExampleHeader from "../../layouts/example/exmaple-header/example-header";


export default function ExampleContainer(): JSX.Element {
  return (
    <div>
      <ExampleHeader />
      <ExampleMain />
      <ExampleFooter />
    </div>
  )
}
