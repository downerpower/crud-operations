import { HOST } from "../shared/constants";
import { FormData, TableData } from "../shared/types";

export const login = async (formData: FormData) => {
   const { username, password } = formData

   const url = `${HOST}/ru/data/v3/testmethods/docs/login`

   const request = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
         username,
         password,
      }),
      headers: {
         "Content-Type": "application/json",
      }
   });
   return await request.json();
};

export const getTableData = async (token: string) => {
   const url = `${HOST}/ru/data/v3/testmethods/docs/userdocs/get`

   const request = await fetch(url,
      {
         headers: { "x-auth": token },
      }
   )

   return await request.json();

}

export const addTableData = async (tableData: [TableData, string]) => {
   const url = `${HOST}/ru/data/v3/testmethods/docs/userdocs/create`;

   const [data, token] = tableData

   let { companySigDate, companySignatureName, documentName, documentStatus, documentType, employeeNumber, employeeSigDate, employeeSignatureName } = data;

   companySigDate += '\t';

   employeeSigDate += '\t';


   const request = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
         companySigDate,
         companySignatureName,
         documentName,
         documentStatus,
         documentType,
         employeeNumber,
         employeeSigDate,
         employeeSignatureName
      }),
      headers: {
         "Content-Type": "application/json",
         "x-auth": token
      }
   });
   return await request.json();
}

export const deleteTableData = async (data: [string, string]) => {
   const [id, token] = data

   const url = `${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`

   const request = await fetch(url, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "x-auth": token
      }
   });
   return await request.json();
}

export const modifyTableData = async (data: [TableData, string, string]) => {
   const [tableData, id, token] = data
   
   const url = `${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${id}`

   let { companySigDate, companySignatureName, documentName, documentStatus, documentType, employeeNumber, employeeSigDate, employeeSignatureName } = tableData;

   companySigDate += '\t';

   employeeSigDate += '\t';

   const request = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
         companySigDate,
         companySignatureName,
         documentName,
         documentStatus,
         documentType,
         employeeNumber,
         employeeSigDate,
         employeeSignatureName
      }),
      headers: {
         "Content-Type": "application/json",
         "x-auth": token
      }
   });
   return await request.json();
}