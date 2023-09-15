import React from "react";
import expect from "expect";
import TestRenderer from "react-test-renderer";

import { EditableTitle } from "./EditableTitle.jsx";

describe("Editable title element", () => {
  it("Render a title", () => {
    const testElement = TestRenderer.create(
      <EditableTitle title="test" id="id" type="item" active={true} />
    );
    const testInstance = testElement.root;
    const expectedElement = (
      <div>
        <div className="Page__title">
          test
        </div>
      </div>
    );

    expect(testElement.toJson).toEqual(expectedElement.toJson);
    expect(testInstance.props.active).toBe(true);
    expect(testInstance.props.type).toBe("item");
    expect(testInstance.props.id).toBe("id");
    expect(testInstance.props.title).toBe("test");
  });

  /*it("On double click, if item is not active, nothing happens", () => {
    expect(2 + 2).toBe(4);
  });

  it("On double click, if user has rights and items is active, title swtich to edit mode.", () => {
    expect(2 + 2).toBe(4);
  });*/
});
