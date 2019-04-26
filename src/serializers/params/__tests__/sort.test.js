import createSortParam from "../sort";

const sortParam = createSortParam();

test("should parse into array of objects with field and direction props", () => {
  expect(sortParam.parse("name")).toEqual([
    {
      field: "name",
      direction: "asc"
    }
  ]);
  expect(sortParam.parse("name,date")).toEqual([
    {
      field: "name",
      direction: "asc"
    },
    {
      field: "date",
      direction: "asc"
    }
  ]);
});

test("should consider minus as descending direction", () => {
  expect(sortParam.parse("-name")).toEqual([
    {
      field: "name",
      direction: "desc"
    }
  ]);
});

test("should serialize into field names", () => {
  const sort = [
    {
      field: "name",
      direction: "asc"
    },
    {
      field: "date",
      direction: "asc"
    }
  ];

  expect(sortParam.serialize(sort)).toEqual("name,date");
});

test("should serialize with minus if sort is descending", () => {
  const sort = [
    {
      field: "name",
      direction: "desc"
    },
    {
      field: "date",
      direction: "desc"
    }
  ];

  expect(sortParam.serialize(sort)).toEqual("-name,-date");
});
