const {isLoggedIn, isNotLoggedIn} = require("./index");


describe("Authentication Test", () => {
    let mockReq, mockRes, mockNext;

    beforeEach(()=> {
        mockReq = {
            isAuthenticated: jest.fn()
        };
        mockRes = {
            redirect: jest.fn()
        };
        mockNext = jest.fn();
    });

    describe("isLoggedInTest", () =>{
        test("if Authenticated is should return next", ()=>{
            mockReq.isAuthenticated.mockReturnValue(true);
            isLoggedIn(mockReq, mockRes, mockNext);
            expect(mockNext).toHaveBeenCalled();
        }),
        test("if Not Authenticated should redirect to home", () => {
            mockReq.isAuthenticated.mockReturnValue(false);
            isLoggedIn(mockReq, mockRes , mockNext);
            expect(mockRes.redirect).toHaveBeenCalledWith("/");
        })
    })

    describe("isNotLoggedInTest", ()=>{


        test("if not Authenticated should return next", ()=>{
            mockReq.isAuthenticated.mockReturnValue(false);
            isNotLoggedIn(mockReq, mockRes, mockNext);
            expect(mockNext).toHaveBeenCalled();
        })

        test("if not Authenticated should return error message", ()=>{
            mockReq.isAuthenticated.mockReturnValue(true);
            isNotLoggedIn(mockReq, mockRes, mockNext);
            const message = "Already loggedin";
            expect(mockRes.redirect).toHaveBeenCalled();
        })
    })

})