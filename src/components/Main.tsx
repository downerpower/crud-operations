import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import ErrorIcon from "@mui/icons-material/Error";
import { ThemeProvider, createTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Spinner from "react-spinner";
import {
  setAddDataLoading,
  setDataLoading,
  setDeleteDataLoading,
  setUpdateDataLoading,
} from "../store/slices/tableDataSlice";
import { TableData } from "../shared/types";
import { ERRORS } from "../shared/constants";

interface Props {
  isLogin: boolean;
}

const Main = ({ isLogin }: Props) => {
  const [width, setWidth] = useState(window.innerWidth);

  const errorMessage = useAppSelector((state) => state.tableData.errorMessage);

  const isLoading = useAppSelector((state) => state.tableData.isLoading);

  const token = localStorage.getItem("token");

  const data = JSON.parse(
    JSON.stringify(useAppSelector((state) => state.tableData.data))
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLogin) {
      token && dispatch(setDataLoading(token));
    }
  }, [dispatch, isLogin, token]);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isTablet = width <= 1024;

  const columns = [
    {
      title: "Company signature date",
      field: "companySigDate",
      headerStyle: {
        fontSize: `${isTablet ? "14px" : "18px"}`,
        fontWeight: "500",
      },
      validate: (rowData: any) => {
        if (
          !/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d{1,3}/.test(
            rowData.companySigDate
          )
        ) {
          return { isValid: false, helperText: "используйте ISO" };
        }
        return true;
      },
    },
    {
      title: "Company signature name",
      field: "companySignatureName",
      headerStyle: {
        fontSize: `${isTablet ? "14px" : "18px"}`,
        fontWeight: "500",
      },
      validate: (rowData: any) =>
        !rowData.companySignatureName
          ? { isValid: false, helperText: "заполните поле" }
          : true,
    },
    {
      title: "Document name",
      field: "documentName",
      headerStyle: {
        fontSize: `${isTablet ? "14px" : "18px"}`,
        fontWeight: "500",
      },
      validate: (rowData: any) =>
        !rowData.documentName
          ? { isValid: false, helperText: "заполните поле" }
          : true,
    },
    {
      title: "Document status",
      field: "documentStatus",
      headerStyle: {
        fontSize: `${isTablet ? "14px" : "18px"}`,
        fontWeight: "500",
      },
      validate: (rowData: any) =>
        !rowData.documentStatus
          ? { isValid: false, helperText: "заполните поле" }
          : true,
    },
    {
      title: "Document type",
      field: "documentType",
      headerStyle: {
        fontSize: `${isTablet ? "14px" : "18px"}`,
        fontWeight: "500",
      },
      validate: (rowData: any) =>
        !rowData.documentType
          ? { isValid: false, helperText: "заполните поле" }
          : true,
    },
    {
      title: "Employee number",
      field: "employeeNumber",
      headerStyle: {
        fontSize: `${isTablet ? "14px" : "18px"}`,
        fontWeight: "500",
      },
      validate: (rowData: any) =>
        !rowData.employeeNumber
          ? { isValid: false, helperText: "заполните поле" }
          : true,
    },
    {
      title: "Employee signature date",
      field: "employeeSigDate",
      headerStyle: {
        fontSize: `${isTablet ? "14px" : "18px"}`,
        fontWeight: "500",
      },
      validate: (rowData: any) => {
        if (
          !/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d{1,3}/.test(
            rowData.employeeSigDate
          )
        ) {
          return { isValid: false, helperText: "используйте ISO " };
        }
        return true;
      },
    },
    {
      title: "Employee signature name",
      field: "employeeSignatureName",
      headerStyle: {
        fontSize: `${isTablet ? "14px" : "18px"}`,
        fontWeight: "500",
      },
      validate: (rowData: any) =>
        !rowData.employeeSignatureName
          ? { isValid: false, helperText: "заполните поле" }
          : true,
    },
  ];

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <>
      {errorMessage ? (
        <div className="error-message error-main">
          <ErrorIcon /> {ERRORS[404]}
        </div>
      ) : (
        <div className="table__container">
          {isLoading && <Spinner />}
          <ThemeProvider theme={theme}>
            <MaterialTable
              title="CRUD-операции"
              data={data}
              columns={columns}
              localization={{
                header: {
                  actions: "",
                },
                body: {
                  editRow: {
                    deleteText: "Вы точно хотите удалить эту колонку?",
                  },
                  emptyDataSourceMessage: "Таблица пока пустая",
                },
              }}
              editable={{
                onRowAdd: (newRow: TableData) =>
                  new Promise<void>((resolve) => {
                    const tableData: any = [newRow, token];

                    dispatch(setAddDataLoading(tableData));
                    resolve();
                  }),
                onRowDelete: (selectedRow: TableData) =>
                  new Promise<void>((resolve) => {
                    const tableData: any = [selectedRow.id, token];
                    dispatch(setDeleteDataLoading(tableData));
                    resolve();
                  }),
                onRowUpdate: (updatedRow: TableData) =>
                  new Promise<void>((resolve) => {
                    const tableData: any = [updatedRow, updatedRow.id, token];
                    dispatch(setUpdateDataLoading(tableData));
                    resolve();
                  }),
              }}
              options={{
                search: false,
                padding: `${isTablet ? "dense" : "default"}`,
                paging: false,

                addRowPosition: "first",
                actionsColumnIndex: -1,
                sorting: false,
                exportButton: false,

                rowStyle: {
                  fontSize: `${isTablet ? "14px" : "16px"}`,
                  padding: 0,
                  textAlign: "center",
                },
              }}
            />
          </ThemeProvider>
        </div>
      )}
    </>
  );
};

export default Main;
