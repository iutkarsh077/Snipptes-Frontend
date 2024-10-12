import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { userContext } from "./GlobalUserProvider";
export default function DescriptionBox({
  setDescription,
  language,
  code
}: {
  setDescription: any,
  language: string,
  code: string
}) {
  const [question, setQuestion] = useState("");
  const {GlobalUserDetails} = useContext<any>(userContext);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Question submitted:", question);
    console.log("Language is: ", language);
    console.log("Code is: ", code);
    setQuestion("");
    try {
      const id = GlobalUserDetails.id;
      if(!id){
        toast.error("Please login before saving your snippet");
      }
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/saveSnippet`, {question, language, code, id});
      console.log(res);
    } catch (error: any) {
      const errorMessage = error?.response?.data || "An unknown errror occured";
      toast.error(errorMessage);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto p-6 bg-background rounded-lg"
    >
      <ToastContainer/>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-bold mb-4 text-foreground"
      >
        Ask a Question
      </motion.h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div whileTap={{ scale: 0.995 }}>
          <textarea
            value={question}
            onChange={(e) => {
                setQuestion(e.target.value), setDescription(e.target.value)
            }}
            placeholder="Type your question here..."
            className="w-full h-32 p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out resize-none example bg-background text-foreground placeholder-muted-foreground"
            aria-label="Question input"
          />
        </motion.div>
        <div className="flex justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-sm text-muted-foreground"
          >
            {question.length} characters
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 py-2 hover:cursor-pointer bg-primary text-primary-foreground rounded-md flex items-center space-x-2 hover:bg-primary/90 transition-colors duration-200"
            disabled={question.length === 0}
          >
            <span>Submit</span>
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
