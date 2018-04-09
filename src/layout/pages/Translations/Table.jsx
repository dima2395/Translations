import React from "react";
import { Table, Button } from "semantic-ui-react";

const formatDate = timestamp =>
  new Date(timestamp * 1000).toLocaleString("ru", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

const TranslationsTable = ({ translations, openTranslationModal, ...rest }) => {
  const headers = [
    "ID",
    "Слово",
    "Перевод",
    "Создано",
    "Изменено",
    "Редактировать"
  ];
  const renderBodyRow = (data, i) => {
    const { id, name, snippet, created, updated } = data;
    return {
      key: id,
      cells: [
        {
          content: id,
          key: `id-${i}`,
          name: "#"
        },
        {
          content: name,
          key: `name-${i}`
        },
        {
          content: snippet ? snippet : "-",
          key: `snippet-${i}`
        },
        {
          content: formatDate(created),
          key: `created-${i}`
        },
        {
          content: formatDate(updated),
          key: `updated-${i}`
        },
        {
          content: (
            <Button color="yellow" onClick={() => openTranslationModal(data)}>
              Изменить
            </Button>
          ),
          key: `actions-${i}`
        }
      ]
    };
  };
  return (
    <Table
      tableData={translations}
      renderBodyRow={renderBodyRow}
      headerRow={headers}
      {...rest}
    />
  );
};

export default TranslationsTable;
