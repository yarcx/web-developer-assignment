import {  USER_TABLE_HEADER } from "../../utils/constants";

const TableHeader = ({tableHeaderData = USER_TABLE_HEADER}: {tableHeaderData?: Array<string>}) => {
  return (
    <thead>
      <tr>
        {tableHeaderData.map((header) => (
          <th
            key={header}
            className={`text-xs font-medium text-app-200 text-left px-6 py-3 ${
              header === tableHeaderData[0]
                ? "w-[22%]"
                : header === tableHeaderData[2]
                ? "w-[392px]"
                : "w-auto"
            }`}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader