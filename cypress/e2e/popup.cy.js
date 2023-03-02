describe("Popup", () => {

    const pageUrl = "http://localhost:4000";

    beforeEach(() => {
        cy.visit(pageUrl);
    })

    it("should be shown when page is loaded every time", () => {
        cy.get("#popup").should("be.visible");
    });

    it("should close once clicked on the close button", () => {
        cy.get("#popup .close").click();
        cy.get("#popup").should("be.hidden");
    });

    it("should close once clicked outside the popup", () => {
        cy.get("#popup.modal").click().should("be.hidden");
    });

    it("should have a confirmation button", () => {
        cy.get("#popup").contains("button", "confirm");
     });

    it("should be not shown when page is reloaded after confirmation", () => {
        cy.get("#popup").should("be.visible")
          .contains("button", "confirm").click()
        cy.get("#popup").should("be.hidden");
        cy.reload();
        cy.get("#popup").should("be.hidden")
    });

    it("should be not shown when page is loaded but it was already confirmed in past 10 minutes", () => {
        let popupHideTime = 10 // hide popup for x minutes
        cy.visit(pageUrl, {
            onBeforeLoad() {
                cy.hidePopupDelay(popupHideTime);
            }
        });
        cy.get("#popup").should("be.hidden");
        cy.wait(popupHideTime * 60 * 1000);
        cy.reload();
        cy.get("#popup").should("be.visible")
    });
});
