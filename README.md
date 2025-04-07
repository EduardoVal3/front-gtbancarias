<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/753062574/23.2.4%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1215384)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
[![](https://img.shields.io/badge/💬_Leave_Feedback-feecdd?style=flat-square)](#does-this-example-address-your-development-requirementsobjectives)
<!-- default badges end -->

# DevExtreme with Vite - How to create a bundle with DevExtreme React components

In this example, you can see how to create a Vite custom bundle for DevExtreme React components. 

## Getting started 
1. Clone the repository.
 ``` text
 git clone https://github.com/DevExpress-Examples/devextreme-vite-react-bundling.git
 ```

2. Go to the project folder.
 ``` text
 cd devextreme-vite-react-bundling
 ```

3. Install the required modules.
 ``` text
 npm install
 ```

4. Bundle the modules. The bundle is located in the *devextreme-bundle* folder. 
 ``` text
 npm run build:devextreme-bundle
 ```

5. Start React app to test the bundle. 
``` text
npm run dev
```
or 
``` text
npm run build
npm run preview
```

You can also modify the *main.js* file to include only modules necessary for your bundle components.

## Documentation

- [Add DevExtreme to a React Application](https://js.devexpress.com/Documentation/Guide/React_Components/Add_DevExtreme_to_a_React_Application/)

- [Create a Custom Bundle](https://js.devexpress.com/React/Documentation/Guide/React_Components/Add_DevExtreme_to_a_React_Application/#Create_a_Custom_Bundle)

## More Examples

- [DataGrid for DevExtreme - How to use DataGrid in an MVC 5 App](https://github.com/DevExpress-Examples/devextreme-datagrid-mvc5)
- [DataGrid for DevExtreme - How to use DataGrid with a WebAPI](https://github.com/DevExpress-Examples/devextreme-datagrid-with-webapi)
- [PivotGrid for DevExtreme - How to use PivotGrid with a WebAPI](https://github.com/DevExpress-Examples/devextreme-pivotgrid-with-webapi)
- [DevExtreme with Webpack](https://github.com/DevExpress-Examples/devextreme-webpack-examples)
- [DevExtreme with JSPM](https://github.com/DevExpress-Examples/devextreme-jspm-examples)
- [DevExtreme with RequireJS](https://github.com/DevExpress-Examples/devextreme-requirejs-examples)
<!-- feedback -->
## Does this example address your development requirements/objectives?

[<img src="https://www.devexpress.com/support/examples/i/yes-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-vite-react-bundling&~~~was_helpful=yes) [<img src="https://www.devexpress.com/support/examples/i/no-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-vite-react-bundling&~~~was_helpful=no)

(you will be redirected to DevExpress.com to submit your response)
<!-- feedback end -->
