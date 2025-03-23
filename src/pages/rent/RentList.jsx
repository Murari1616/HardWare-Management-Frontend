import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { getAllRents, updateRent } from "@/redux/features/rentSlice";
import { Ellipsis, Loader, Plus, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "@/components/ConfirmDilaog";

const RentList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { rents, isLoading, totalPages, totalRecords, } = useSelector((state) => state.rent);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [selectedDate, setSelectedDate] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRent, setSelectedRent] = useState(null);
    const [visiblePages, setVisiblePages] = useState(5);

    const handleSearch = () => {
        setSearchQuery(searchTerm);
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    };

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setSelectedDate(newDate);
    };

    const getPageNumbers = () => {
        let start = Math.max(
            0,
            pagination.pageIndex - Math.floor(visiblePages / 2)
        );
        const end = Math.min(totalPages, start + visiblePages);

        if (end - start < visiblePages) {
            start = Math.max(0, end - visiblePages);
        }

        return Array.from({ length: end - start }, (_, i) => start + i);
    };

    // Function to calculate days rented
    const calculateDays = (rentDate) => {
        const startDate = new Date(rentDate);
        const today = new Date();
        startDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return Math.ceil((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
    };

    // Function to calculate total rent
    const calculateTotalRent = (rent) => {
        return rent.rent * calculateDays(rent.date) + (rent.extraCost || 0);
    };

    // Function to calculate closing amount
    const calculateClosingAmount = (rent) => {
        return rent.rent * calculateDays(rent.date) - rent.advance + (rent.extraCost || 0);
    };

    //function to convert date and time to local
    const formatDateTime = (date, time) => {
        const formattedDate = date
            ? new Date(date).toLocaleDateString("en-GB").split("/").join("-")
            : "N/A";

        const formattedTime = time
            ? new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            })
            : "";

        return `${formattedDate} / ${formattedTime}`;
    };

    const handleConfirm = () => {
        if (selectedRent) {
            handleSubmit(selectedRent); // Call API
            setIsDialogOpen(false); // Close modal
        }
    };

    // Submit function to mark rent as returned
    const handleSubmit = async (rent) => {
        const returnDate = new Date().toISOString().split("T")[0];
        const outTime = new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });

        const updatedRent = {
            ...rent,
            returnDate,
            outTime,
            rentToBePaid: calculateTotalRent(rent),
            closingAmount: calculateClosingAmount(rent),
            totalRentDays: calculateDays(rent.date),
        };

        try {
            const response = await dispatch(updateRent({ id: rent._id, updatedData: updatedRent }));

            if (updateRent.fulfilled.match(response)) { // ✅ Correctly checking if update was successful
                toast({
                    title: "Success",
                    description: "Returned Successfully",
                    variant: "success",
                });
                dispatch(getAllRents({
                    page: pagination.pageIndex + 1,
                    limit: pagination.pageSize,
                    search: searchQuery,
                    date: selectedDate
                }));
            } else {
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: response.payload || "Failed to update rent",
                });
            }
        } catch (error) {
            console.log("ERROR", error);
        }
    };


    useEffect(() => {
        dispatch(getAllRents({
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize,
            search: searchQuery,
            date: selectedDate
        }));
    }, [pagination.pageIndex,
    pagination.pageSize,
        searchQuery, selectedDate]);

    if (isLoading) {
        return (<div className="mt-72"><Loader /></div>)
    }

    return (
        <div className="w-full h-full">
            <div className="w-full h-full flex flex-col bg-white rounded-lg">
                <div className="m-4 flex justify-between">
                    <Button onClick={() => navigate('/rent-creation')}>
                        Rent Creation <Plus />
                    </Button>
                    <div className="flex gap-4 w-full justify-end w-fit">
                        <Input
                            type="date"
                            className="w-36"
                            defaultValue={new Date().toLocaleDateString("en-CA")}
                            onChange={handleDateChange}
                        />
                        <div className="flex items-center gap-4 lg:w-64 md:w-[400px] w-full justify-between">
                            <div className="relative w-full lg:w-64">
                                <Input
                                    placeholder="Search Rents..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                />
                                {/* {searchTerm && (<Cross/>)} */}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={handleSearch}
                                >
                                    <SearchIcon className="h-4 w-4 text-muted-foreground" />
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="w-full h-full rounded-md bg-white px-4">
                    {/* Table */}
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <Table className="w-full">
                            <TableHeader className="bg-muted-light hover:bg-transparent">
                                <TableRow>
                                    <TableHead>Customer Name</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Product & Type</TableHead>
                                    <TableHead>Extras</TableHead>
                                    <TableHead>Rent</TableHead>
                                    <TableHead>Advance</TableHead>
                                    <TableHead>Extras Cost</TableHead>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Return Date</TableHead>
                                    <TableHead>Rent Days</TableHead>
                                    <TableHead>Total Rent</TableHead>
                                    <TableHead>Closing Amount</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rents?.length > 0 ? (
                                    rents.map((rent) => (
                                        <TableRow key={rent._id}>
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    <span>{rent.customerName}</span>
                                                    <div
                                                        className={`w-2 h-2 rounded-full mt-1 ml-2 ${rent.returnDate ? "bg-green-400" : "bg-red-500"
                                                            }`}
                                                    ></div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{rent.phoneNumber}</TableCell>
                                            <TableCell>{rent.productName} - {rent.typeName}</TableCell>
                                            <TableCell>{rent.extras || "N/A"}</TableCell>
                                            <TableCell>Rs.{rent.rent}/-</TableCell>
                                            <TableCell>Rs.{rent.advance}/-</TableCell>
                                            <TableCell>{rent.extraCost ? `Rs.${rent.extraCost}/-` : "N/A"}</TableCell>
                                            <TableCell>{formatDateTime(rent.date, rent.inTime)}</TableCell>
                                            <TableCell>{rent.returnDate ? formatDateTime(rent.returnDate, rent.outTime) : "Not Returned"}</TableCell>
                                            <TableCell>{calculateDays(rent.date)} days</TableCell>
                                            <TableCell>Rs.{calculateTotalRent(rent)}/-</TableCell>
                                            <TableCell>Rs.{calculateClosingAmount(rent)}/-</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2 items-center">
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <button
                                                                className="border border-black rounded-md w-5 h-5 flex justify-center items-center"
                                                                onClick={() => {
                                                                    if (!rent.returnDate) {
                                                                        setSelectedRent(rent);
                                                                        setIsDialogOpen(true); // Open modal
                                                                    }
                                                                }}
                                                            >
                                                                {rent.returnDate ? "✔️" : ""}
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="bg-white border border-gray-200 shadow-md">
                                                            <p>Return</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <Ellipsis />
                                                        </TooltipTrigger>
                                                        <TooltipContent className="bg-white border border-gray-200 shadow-md">
                                                            <p>More</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan="10" className="text-center">
                                            No rents found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>.
                <div className="flex justify-between items-center py-4 mx-4">
                    <span>
                        Showing{" "}
                        {rents.length ? pagination.pageIndex * pagination.pageSize + 1 : 0}-
                        {Math.min(
                            (pagination.pageIndex + 1) * pagination.pageSize,
                            totalRecords || 0
                        )}{" "}
                        of {totalRecords || 0} results
                    </span>
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            onClick={() =>
                                setPagination((prev) => ({
                                    ...prev,
                                    pageIndex: prev.pageIndex - 1,
                                }))
                            }
                            disabled={pagination.pageIndex === 0}
                        >
                            Previous
                        </Button>

                        {getPageNumbers().map((index) => (
                            <Button
                                key={index}
                                variant="outline"
                                onClick={() =>
                                    setPagination((prev) => ({ ...prev, pageIndex: index }))
                                }
                                className={
                                    pagination.pageIndex === index ? "bg-primary text-white" : ""
                                }
                            >
                                {index + 1}
                            </Button>
                        ))}

                        <Button
                            variant="outline"
                            onClick={() =>
                                setPagination((prev) => ({
                                    ...prev,
                                    pageIndex: prev.pageIndex + 1,
                                }))
                            }
                            disabled={pagination.pageIndex >= totalPages - 1}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
            {/* Confirmation Dialog */}
            <ConfirmDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleConfirm}
                title="Confirm Return"
                description="Are you sure you want to mark this rent as returned?"
            />
        </div>
    );
};

export default RentList;
