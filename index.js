const express = require('express');
const app = express();
app.use(express.json());

const fullName = "anam saeed";  
const dob = "29062004";      
const userId = `${fullName.replace(/ /g, "_")}_${dob}`;
const email = "shoptyannu@gmail.com"; 
const rollNumber = "22BCE11045"; 

app.post('/bfhl', (req, res) => {
  try {
    const input = req.body.data;

    if (!Array.isArray(input)) {
      return res.status(400).json({ is_success: false, message: "Invalid input: data must be an array" });
    }

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let allAlphabetsConcat = '';

    input.forEach(item => {
      if (typeof item === 'string') {
        if (/^\d+$/.test(item)) {
          let num = parseInt(item, 10);
          if (num % 2 === 0) {
            even_numbers.push(item);
          } else {
            odd_numbers.push(item);
          }
          sum += num;
        }
        else {
          let letters = item.match(/[a-zA-Z]/g);
          if (letters) {
            alphabets.push(letters.join('').toUpperCase());
            allAlphabetsConcat += letters.join('');
          }
          let digits = item.match(/\d+/g);
          if (digits) {
            digits.forEach(d => {
              let num = parseInt(d, 10);
              if (num % 2 === 0) {
                even_numbers.push(d);
              } else {
                odd_numbers.push(d);
              }
              sum += num;
            });
          }
          let specials = item.match(/[^a-zA-Z0-9]/g);
          if (specials) {
            special_characters.push(...specials);
          }
        }
      }
    });

    let reversed = allAlphabetsConcat.split('').reverse();
    let concatString = reversed.map((char, i) => i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()).join('');

    res.status(200).json({
      is_success: true,
      user_id: userId,
      email: email,
      roll_number: rollNumber,
      odd_numbers: odd_numbers,
      even_numbers: even_numbers,
      alphabets: alphabets,
      special_characters: special_characters,
      sum: sum.toString(),
      concat_string: concatString
    });

  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
