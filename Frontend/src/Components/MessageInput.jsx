import React, { useRef, useState } from 'react';
import { ChatStore } from '../Api/Chat';
import { toast } from 'react-hot-toast';
import { X, Image, Send } from 'lucide-react';

const MessageInput = () => {
    const [text, setText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null); // Add this line
    const fileInputRef = useRef(null);
    const { SendMessage } = ChatStore();

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error("Please select a valid image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        try {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setImageFile(file); // Store the file object
            };
            reader.onerror = () => {
                toast.error("Failed to load image");
                setImagePreview(null);
                setImageFile(null);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            toast.error("Error processing image");
            console.error("Image processing error:", error);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setImageFile(null); // Clear the file object
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imageFile) {
            toast.error("Message cannot be empty");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('text', text.trim());
            if (imageFile) {
                formData.append('image', imageFile);
            }

            await SendMessage(formData);

            setText('');
            setImagePreview(null);
            setImageFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            toast.success("Message sent!");
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    };

    return (
        <div className="p-4 w-full bg-gray-800 border-t border-gray-700">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-gray-600"
                            onError={() => {
                                toast.error("Error loading image preview");
                                removeImage();
                            }}
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-700
                            flex items-center justify-center hover:bg-gray-600 transition-colors"
                            type="button"
                            aria-label="Remove image"
                        >
                            <X className="size-3 text-gray-300" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        className={`p-2 rounded-full hover:bg-gray-700 transition-colors
                        ${imagePreview ? "text-green-400" : "text-gray-400"}`}
                        onClick={() => fileInputRef.current?.click()}
                        aria-label="Attach image"
                    >
                        <Image size={20} />
                    </button>
                </div>
                <button
                    type="submit"
                    className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!text.trim() && !imagePreview}
                    aria-label="Send message"
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;