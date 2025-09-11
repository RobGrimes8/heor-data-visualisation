describe("Productivity Score Math from fixture", () => {
    const calculateProductivityScore = ({
        hours_worked,
        break_minutes,
        focus_level,
    }) => {
        if (hours_worked === 0) return 0;
        return Math.max(
            hours_worked * 10 + focus_level * 5 - break_minutes * 0.5,
            0
        );
    };

    it("calculates productivity scores correctly from fixture", () => {
        cy.fixture("productivity_test_cases.json").then((testCases) => {
            testCases.forEach(
                ({
                    hours_worked,
                    break_minutes,
                    focus_level,
                    expected_score,
                }) => {
                    const score = calculateProductivityScore({
                        hours_worked,
                        break_minutes,
                        focus_level,
                    });
                    expect(score).to.equal(expected_score);
                }
            );
        });
    });
});
