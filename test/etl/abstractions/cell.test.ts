import { CellType } from "../../../src/etl/enums/cellType";
import { Cell } from "../../../src/etl/abstractions/cell";


test('Constructor_InitializeCell_ReturnsValidCell', () => {

    // Arrange
    let cellRef = "A3";
    let cellObj = {
        t: "s",
        v: "مـــن تعـــــــداد 2017",
        w: "مـــن تعـــــــداد 2017"
    };

    // Act
    const cell = new Cell(cellRef, cellObj);

    // Assert
    expect(cell.ref).toBe("A3");
    expect(cell.col).toBe("A");
    expect(cell.row).toBe(3);
    expect(cell.type).toBe(CellType.String);
    expect(cell.text).toBe("مـــن تعـــــــداد 2017");
    expect(cell.value).toBe("مـــن تعـــــــداد 2017");
});

test('Constructor_InitializeStringCell_CellTypeIsString', () => {
    let cell = new Cell("A6", {
        t: "s",
        v: "قسم ثان أســــوان",
        w: "قسم ثان أســــوان"
    });

    expect(cell.type).toBe(CellType.String);
});

test('Constructor_InitializeNumberCell_CellTypeIsNumberAndValueIsNumeric', () => {
    let cell = new Cell("X12", {
        t: "n",
        v: 50,
        w: "50",
    });

    expect(cell.type).toBe(CellType.Number);
    expect(cell.value).toBe(50);
});