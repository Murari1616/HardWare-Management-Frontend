import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllRents } from "@/redux/features/rentSlice";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RentList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { rents, isLoading, error } = useSelector((state) => state.rent)
    const calculateDays = (rentDate) => {
        const startDate = new Date(rentDate);
        const today = new Date();

        startDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        let diffDays = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
        return diffDays;
    };
    useEffect(() => {
        dispatch(getAllRents());
    }, [])
    return (
        <div className="w-full h-full">
            <div className="w-full h-full flex flex-col bg-white rounded-lg">
                <div className="m-4 flex justify-between">
                    <Button onClick={() => navigate('/pages/rent-creation')}>Rent Creation<Plus /></Button>
                    <Input className='w-[300px]' placeholder='Search....' />
                </div>
                <div className="w-full h-full rounded-md bg-white px-4">
                    {/* Table */}
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <Table className=" w-full ">
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
                                </TableRow>
                            </TableHeader>
                            <TableBody >
                                {rents?.length > 0 ? (
                                    rents.map((rent) => (
                                        <TableRow key={rent._id} >
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    <span>{rent.customerName}</span>
                                                    <span className="text-[8px] shadow-[20px]">{rent.returnDate ? "🟢" : "🔴"}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{rent.phoneNumber}</TableCell>
                                            <TableCell>{rent.productName}-{rent.typeName}</TableCell>
                                            <TableCell>{rent.extras || 'N/A'}</TableCell>
                                            <TableCell>Rs.{rent.rent}/-</TableCell>
                                            <TableCell>Rs.{rent.advance}/-</TableCell>
                                            <TableCell>{rent.extraCost ? `Rs.${rent.extraCost}/-` : "N/A"}</TableCell>
                                            <TableCell>
                                                {rent?.date ? new Date(rent.date).toLocaleDateString("en-GB").split("/").join("-") : "N/A"}{" "}
                                                /
                                                {rent?.inTime ? new Date(`1970-01-01T${rent.inTime}`).toLocaleTimeString("en-US", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true
                                                }) : ""}
                                            </TableCell>
                                            <TableCell>{rent.returnDate ? rent.returnDate : "Not Returned"}</TableCell>
                                            <TableCell>
                                                {(() => {
                                                    const days = calculateDays(rent.date);
                                                    return `${days} day${days > 1 ? "s" : ""}`;
                                                })()}
                                            </TableCell>
                                            <TableCell>Rs.{rent.rent * calculateDays(rent.date) + rent.extraCost}/-</TableCell>
                                            <TableCell>
                                                {(() => {
                                                    const total = rent.rent * calculateDays(rent.date) - rent.advance + rent.extraCost;
                                                    return `${total < 0 ? "-" : "+"}Rs.${Math.abs(total)}/-`;
                                                })()}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow >
                                        <TableCell colSpan="10" className="text-center ">
                                            No rents found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RentList
