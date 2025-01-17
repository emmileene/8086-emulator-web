export const instruction_set = [
  {
    name: 'Common Terms',
    instructions: [
      {
        opcode: '',
        name: 'Label',
        example: '',
        description:
          'A single, no space containing word, immediately followed by a colon (:) when defining the label. Can contain _, 0-9, a-z, A-Z, but must not start with a number.',
        usage: ['_jmp:mov ax,0x1', 'num:DB 0x5'],
      },
      {
        opcode: '',
        name: 'Number',
        example: '',
        description:
          'Three formats of numbers: 1) Decimal : using 0-9. 2) Binary : using 0 and 1, must start with 0b, eg : 5 = 0b0101 3) Hexadecimal : using 0-9,a-f, must start with 0x, eg : 5 = 0x5',
        usage: [],
      },
      {
        opcode: '',
        name: 'Unsigned Byte Number',
        example: '',
        description:
          '8-bit number. Can be binary, decimal or hexadecimal. Number in range 0 -> 255.',
        usage: [],
      },
      {
        opcode: '',
        name: 'Signed Byte Number',
        example: '',
        description:
          "8-bit number. Can be binary, decimal or hexadecimal. Number in range -128 -> 127, only decimal numbers with '-' can be used, for other format use 2's complement for negating.",
        usage: [],
      },
      {
        opcode: '',
        name: 'Signed Word Number',
        example: '',
        description:
          "16-bit number. Can be binary, decimal or hexadecimal. Numbers in range -32768 -> 32767, only decimal numbers with '-' can be used, for other format use 2's complement for negating.",
        usage: [],
      },
      {
        opcode: '',
        name: 'Unsigned Word Number',
        example: '',
        description:
          '16-bit number. Can be binary, decimal or hexadecimal. Numbers in range 0 -> 65535.',
        usage: [],
      },
      {
        opcode: '',
        name: 'Byte',
        example: '',
        description: 'The actual word "Byte"',
        usage: [],
      },
      {
        opcode: '',
        name: 'Word',
        example: '',
        description: 'The actual word "Word"',
        usage: [],
      },
      {
        opcode: '',
        name: 'Memory',
        example: '',
        description:
          '8086 allows four types of memory addressing. Note that when BP is used, Stack Segment is used, for others, Data Segment is used, unless segment override is specified',
        usage: [
          '(segment-register) [offset] : offset of the data from current DS, or specified segment override',
          '(segment-register) [bx/bp/si/di] : The offset of value is taken from the specified register',
          '(segment-register) [bs/bp/si/di , signed word number] : The offset is taken from the registers, and the number is added to it',
          '(segment-register) [bs/bp , si/di , (signed word number) ] : The offset is taken from the base registers, and offset in index registers as well as the number is added to it. The number offset is optional',
        ],
      },
      {
        opcode: '',
        name: 'Word Registers',
        example: '',
        description: 'AX,BX,CX,DX,BP,SP,SI,DI',
        usage: [],
      },
      {
        opcode: '',
        name: 'Byte Registers',
        example: '',
        description: 'AL,AH,BL,BH,CL,CH,DL,DH',
        usage: [],
      },
      {
        opcode: '',
        name: 'Segment Register',
        example: '',
        description: 'ES,DS,SS,CS ',
        usage: [],
      },
    ],
  },
  {
    name: 'Data Directives',
    instructions: [
      {
        opcode: 'Set',
        name: '',
        example: 'set 0xFFFF',
        description: 'Used to set value of DS when storing the data',
        usage: ['set unsigned word number'],
      },
      {
        opcode: 'DB',
        name: 'Store Byte',
        example: 'DB 5',
        description:
          'Used to store a byte wide number, or declare array of bytes or to store byte strings',
        usage: [
          'DB signed/unsigned byte number : Stores a single number',
          'DB [unsigned word number] : Set given number of bytes to 0 (Can be used to declared arrays)',
          'DB [signed/unsigned byte number, unsigned word number] : sets given number of bytes (second argument) to given value (first argument)',
          'DB "string" : stores a string , characters or not escaped, eg : \\n will be stored as \\ and n.',
        ],
      },
      {
        opcode: 'DW',
        name: 'Store Word',
        example: 'DW 5',
        description:
          'Used to store a word wide number, or declare array of word or to store word strings',
        usage: [
          'DW signed/unsigned byte number : Stores a single number',
          'DW [unsigned word number] : Set given number of words to 0 (Can be used to declared arrays)',
          'DW [signed/unsigned byte number, unsigned word number] : sets given number of words (second argument) to given value (first argument)',
          'DW "string" : stores a string , characters or not escaped, eg : \\n will be stored as \\ and n.',
        ],
      },
      {
        opcode: 'OFFSET',
        name: 'Offset of data',
        example: 'OFFSET num',
        description:
          'used to get offset of value from the data segment it was defined in. \nNote that this only gives offset from the segment was defined in, so if DS was changed using set, it will contain offset from that value. ',
        usage: ['OFFSET data-label'],
      },
    ],
  },
  {
    name: 'Code Directives',
    instructions: [
      {
        opcode: '',
        name: 'Macro Definition',
        example: '',
        description: `Used to define macros, which can be used to put code in place, where parameters are replaced by given values at compile time.
          Note that recursive macros (direct/ indirect) are not supported. For no parameter macro use single _ as parameter in definition as well as use.`,
        usage: [
          'MACRO macro-name (comma separated parameter list) -> macro string <-',
        ],
      },
      {
        opcode: '',
        name: 'Macro Use',
        example: '',
        description: `When using macro, string defined between -> and <- will be placed at use, with parameters replaced by given.
Note that not all values are allowed as macro parameters, for example, memory access with segment override is not allowed : 'byte ES [0]' is not allowed.`,
        usage: ['macro-name (comma separated argument list)'],
      },
      {
        opcode: '',
        name: 'Procedure',
        example: '',
        description: `Used to define procedure, which can be used with CALL instruction.
Valid procedure names can must start with and underscore (_) or a-z or A-Z, and can contain only underscores, a-z,A-Z and 0-9 in them.`,
        usage: [
          'def proc_name { procedure body } : Procedure Body can contains opcodes and macro use',
        ],
      },
    ],
  },
  {
    name: 'Arithmetic',
    instructions: [
      {
        opcode: 'ADD',
        name: 'Add',
        example: 'ADD AX, BX',
        description: `The ADD instruction adds the contents of the source operand to the destination`,
        usage: [
          'ADD byte-register , byte-register',
          'ADD word-register , word-register',
          'ADD byte-register , byte memory',
          'ADD word-register , word memory',
          'ADD byte-register , byte label',
          'ADD word-register , word label',
          'ADD byte memory , byte-register',
          'ADD word memory , word-register',
          'ADD byte label , byte-register',
          'ADD word label , word-register',
          'ADD byte-register , unsigned/signed byte number',
          'ADD word-register , unsigned/signed word number',
          'ADD byte memory , unsigned/signed byte number',
          'ADD word memory , unsigned/signed word number',
          'ADD byte label , unsigned/signed byte number',
          'ADD word label , unsigned/signed word number',
        ],
      },
      {
        opcode: 'ADC',
        name: 'Add with carry',
        example: 'ADC AX ,BX',
        description:
          'This instruction performs the same operation as ADD instruction , but adds the carry flag bit to the result.',
        usage: [
          'ADC byte-register , byte-register',
          'ADC word-register , word-register',
          'ADC byte-register , byte memory',
          'ADC word-register , word memory',
          'ADC byte-register , byte label',
          'ADC word-register , word label',
          'ADC byte memory , byte-register',
          'ADC word memory , word-register',
          'ADC byte label , byte-register',
          'ADC word label , word-register',
          'ADC byte-register , unsigned/signed byte number',
          'ADC word-register , unsigned/signed word number',
          'ADC byte memory , unsigned/signed byte number',
          'ADC word memory , unsigned/signed word number',
          'ADC byte label , unsigned/signed byte number',
          'ADC word label , unsigned/signed word number',
        ],
      },
      {
        opcode: 'SUB',
        name: 'Subtract',
        example: 'SUB AX, BX',
        description: `The subtract instruction subtracts the source operand from the destination operand
and the result is left in the destination operand.`,
        usage: [
          'SUB byte-register , byte-register',
          'SUB word-register , word-register',
          'SUB byte-register , byte memory',
          'SUB word-register , word memory',
          'SUB byte-register , byte label',
          'SUB word-register , word label',
          'SUB byte memory , byte-register',
          'SUB word memory , word-register',
          'SUB byte label , byte-register',
          'SUB word label , word-register',
          'SUB byte-register , unsigned/signed byte number',
          'SUB word-register , unsigned/signed word number',
          'SUB byte memory , unsigned/signed byte number',
          'SUB word memory , unsigned/signed word number',
          'SUB byte label , unsigned/signed byte number',
          'SUB word label , unsigned/signed word number',
        ],
      },
      {
        opcode: 'SBB',
        name: 'Subtract with Borrow',
        example: 'SBB AX, BX',
        description: `The subtract with borrow instruction subtracts the source operand and the borrow flag
(CF) which may reflect the result of the previous calculations, from the destination
operand`,
        usage: [
          'SBB byte-register , byte-register',
          'SBB word-register , word-register',
          'SBB byte-register , byte memory',
          'SBB word-register , word memory',
          'SBB byte-register , byte label',
          'SBB word-register , word label',
          'SBB byte memory , byte-register',
          'SBB word memory , word-register',
          'SBB byte label , byte-register',
          'SBB word label , word-register',
          'SBB byte-register , unsigned/signed byte number',
          'SBB word-register , unsigned/signed word number',
          'SBB byte memory , unsigned/signed byte number',
          'SBB word memory , unsigned/signed word number',
          'SBB byte label , unsigned/signed byte number',
          'SBB word label , unsigned/signed word number',
        ],
      },
      {
        opcode: 'CMP',
        name: 'Compare',
        example: 'CMP CX, DX',
        description: `The CMP instruction performs a subtraction like SUB instruction, but unlike SUB the result is not stored, only the flags are updated`,
        usage: [
          'CMP byte-register , byte-register',
          'CMP word-register , word-register',
          'CMP byte-register , byte memory',
          'CMP word-register , word memory',
          'CMP byte-register , byte label',
          'CMP word-register , word label',
          'CMP byte memory , byte-register',
          'CMP word memory , word-register',
          'CMP byte label , byte-register',
          'CMP word label , word-register',
          'CMP byte-register , unsigned/signed byte number',
          'CMP word-register , unsigned/signed word number',
          'CMP byte memory , unsigned/signed byte number',
          'CMP word memory , unsigned/signed word number',
          'CMP byte label , unsigned/signed byte number',
          'CMP word label , unsigned/signed word number',
        ],
      },
      {
        opcode: 'NEG',
        name: 'Negate a value',
        example: 'NEG AL',
        description:
          "Replace the value of the byte or word with its two's complement",
        usage: [
          'NEG byte-register',
          'NEG word-register',
          'NEG byte memory',
          'NEG word memory',
          'NEG byte label',
          'NEG word label',
        ],
      },
      {
        opcode: 'MUL',
        name: 'Unsigned Multiplication',
        example: 'MUL CX',
        description:
          'This instruction multiplies an unsigned byte or word by the contents of AL',
        usage: [
          'MUL byte-register',
          'MUL word-register',
          'MUL byte memory',
          'MUL word memory',
          'MUL byte label',
          'MUL word label',
        ],
      },
      {
        opcode: 'IMUL',
        name: 'Signed Multiplication',
        example: 'IMUL CX',
        description: `This instruction multiplies a signed byte in source operand by a signed byte in AL or a signed word in source operand by a signed word in AX.`,
        usage: [
          'IMUL byte-register',
          'IMUL word-register',
          'IMUL byte memory',
          'IMUL word memory',
          'IMUL byte label',
          'IMUL word label',
        ],
      },
      {
        opcode: 'DIV',
        name: 'Unsigned Division',
        example: 'DIV CX',
        description:
          'This instruction is used to divide an unsigned word by a byte or to divide an unsigned double word by a word.',
        usage: [
          'DIV byte-register',
          'DIV word-register',
          'DIV byte memory',
          'DIV word memory',
          'DIV byte label',
          'DIV word label',
        ],
      },
      {
        opcode: 'IDIV',
        name: 'Signed Division',
        example: 'IDIV CX',
        description:
          'This instruction is used to divide an signed word by a byte or to divide an signed double word by a word.',
        usage: [
          'IDIV byte-register',
          'IDIV word-register',
          'IDIV byte memory',
          'IDIV word memory',
          'IDIV byte label',
          'IDIV word label',
        ],
      },
      {
        opcode: 'INC',
        name: 'Increment',
        example: 'INC AX',
        description:
          'This instruction increases the contents of  the specified register or memory location by 1.',
        usage: [
          'INC byte-register',
          'INC word-register',
          'INC byte memory',
          'INC word memory',
          'INC byte label',
          'INC word label',
        ],
      },
      {
        opcode: 'DEC',
        name: 'Decrement',
        example: 'DEC AX',
        description:
          'The decrement instruction subtracts 1 from the contents of the specified register or memory location',
        usage: [
          'DEC byte-register',
          'DEC word-register',
          'DEC byte memory',
          'DEC word memory',
          'DEC byte label',
          'DEC word label',
        ],
      },
      {
        opcode: 'AAA',
        name: 'Adjust ASCII for Addition',
        example: 'AAA',
        description:
          'Changes contents of AL to contain valid unpacked decimal number',
        usage: ['AAA'],
      },
      {
        opcode: 'AAD',
        name: 'Adjust ASCII for division',
        example: 'AAD',
        description:
          'Modifies numerator in AL before dividing two valid unpacked decimal operands, so that quotient produced by division will be valid unpacked decimal number',
        usage: ['AAD'],
      },
      {
        opcode: 'AAM',
        name: 'Adjust ASCII for multiplication',
        example: 'AAM',
        description:
          'Corrects result of previous multiplication of two valid unpacked decimal operands',
        usage: ['AAM'],
      },
      {
        opcode: 'AAS',
        name: 'Adjust ASCII for subtraction',
        example: 'AAS',
        description:
          'Corrects result of previous subtraction of two valid unpacked decimal operands',
        usage: ['AAS'],
      },
      {
        opcode: 'DAA',
        name: 'Adjust decimal for Addition',
        example: 'DAA',
        description:
          'Corrects the result of previously adding two valid packed decimal operands',
        usage: ['DAA'],
      },
      {
        opcode: 'DAS',
        name: 'Adjust decimal for subtraction',
        example: 'DAS',
        description:
          'Corrects the result of previous subtraction two valid packed decimal operands',
        usage: ['DAS'],
      },
      {
        opcode: 'CBW',
        name: 'Convert Byte to Word',
        example: 'CBW',
        description: 'Used to extend sign bit of AL throughout register AH',
        usage: ['CBW'],
      },
      {
        opcode: 'CWD',
        name: 'Convert signed Word to signed Doubleword',
        example: 'CWD',
        description: 'Used to extend sign bit of AX throughout register DX',
        usage: ['CWD'],
      },
    ],
  },
  {
    name: 'Data Transfer',
    instructions: [
      {
        opcode: 'MOV',
        name: 'Move',
        description:
          'Used to copy the byte or word from the provided source to the provided destination',
        example: 'MOV AX,BX',
        usage: [
          'MOV register , register',
          'MOV word_reg , word_reg',
          'MOV register , byte memory',
          'MOV register , word memory',
          'MOV register , byte label',
          'MOV register , word label',
          'MOV byte memory , byte-register',
          'MOV word memory , word-register',
          'MOV byte label , byte-register',
          'MOV word label , word-register',
          'MOV byte-register , unsigned/signed byte number',
          'MOV word-register , unsigned/signed word number',
          'MOV byte memory , unsigned/signed byte number',
          'MOV word memory , unsigned/signed word number',
          'MOV byte label , unsigned/signed byte number',
          'MOV word label , unsigned/signed word number',
          'MOV segment-register,word-register',
          'MOV word-register,segment-register',
          'MOV memory,segment-register',
          'MOV word label,segment-register',
          'MOV segment-register,memory,',
          'MOV segment-register,word label',
        ],
      },
      {
        opcode: 'XCHG',
        name: 'Exchange',
        example: 'XCHG AX,BX',
        description: 'Exchanges contents of the two operands',
        usage: [
          'XCHG byte-register, byte-register ',
          'XCHG word-register , word-register ',
          'XCHG byte memory, byte-register ',
          'XCHG word memory, word-register ',
          'XCHG byte byte label, byte-register',
          'XCHG word word label, word-register ',
          'XCHG byte-register ,byte memory',
          'XCHG word-register ,word memory',
          'XCHG byte byte-register ,byte label',
          'XCHG word word-register ,word_add',
        ],
      },
      {
        opcode: 'IN',
        name: 'Input',
        example: '--Not Supported--',
        description:
          'Used to read a byte or word from the provided port to the accumulator',
        usage: ['Not Supported'],
      },
      {
        opcode: 'OUT',
        name: 'Output',
        example: '--Not Supported--',
        description:
          'Used to send out a byte or word from the accumulator to the provided port',
        usage: ['Not Supported'],
      },
      {
        opcode: 'POP',
        name: 'POP from stack',
        example: 'POP AX',
        description:
          'Used to get a word from the top of the stack to the provided location',
        usage: [
          'POP word-register',
          'POP segment-register (CS not allowed)',
          'POP word memory',
          'POP word label',
        ],
      },
      {
        opcode: 'PUSH',
        name: 'PUSH into stack',
        example: 'PUSH DX',
        description: 'Used to put a word at the top of the stack',
        usage: [
          'PUSH word-register',
          'PUSH segment-register (CS allowed)',
          'PUSH word memory',
          'PUSH word label',
        ],
      },
      {
        opcode: 'LDS/LES',
        name: 'Load DS/ES register',
        example: '--Not Supported--',
        description:
          'Used to load DS/ES register and other provided register from the memory',
        usage: ['Not Supported'],
      },
      {
        opcode: 'LEA',
        name: 'Load address of operand',
        example: '',
        description:
          'Used to load the address of operand into the provided register.',
        usage: [
          'LEA word-register , word memory',
          'LEA word-register , word label',
        ],
      },
    ],
  },
  {
    name: 'Bit Manipulation',
    instructions: [
      {
        opcode: 'NOT',
        name: 'Bitwise Not',
        example: 'NOT AL',
        description: 'Used to invert each bit of a byte or word.',
        usage: [
          'NOT register',
          'NOT byte memory',
          'NOT word memory',
          'NOT word label',
          'NOT byte label',
        ],
      },
      {
        opcode: 'AND',
        name: 'Bitwise AND',
        example: 'AND AX, 0x10',
        description:
          'Used for performing bitwise AND operation between operands',
        usage: [
          'AND register , register',
          'AND word_reg , word_reg',
          'AND register , byte memory ',
          'AND register , word memory ',
          'AND register , byte label ',
          'AND register , word label ',
          'AND byte memory , byte-register ',
          'AND word memory , word-register ',
          'AND byte label , byte-register',
          'AND word label , word-register',
          'AND byte-register , unsigned byte number',
          'AND word-register , unsigned word number  ',
          'AND byte memory , unsigned byte number',
          'AND word memory , unsigned word number',
          'AND byte label , unsigned byte number',
          'AND word label , unsigned word number',
        ],
      },
      {
        opcode: 'OR',
        name: 'Bitwise OR',
        example: 'OR BL, byte [BP]',
        description:
          'Used for performing bitwise OR operation between operands',
        usage: [
          'OR register , register',
          'OR word_reg , word_reg',
          'OR register , byte memory ',
          'OR register , word memory ',
          'OR register , byte label ',
          'OR register , word label ',
          'OR byte memory , byte-register ',
          'OR word memory , word-register ',
          'OR byte label , byte-register',
          'OR word label , word-register',
          'OR byte-register , unsigned byte number',
          'OR word-register , unsigned word number  ',
          'OR byte memory , unsigned byte number',
          'OR word memory , unsigned word number',
          'OR byte label , unsigned byte number',
          'OR word label , unsigned word number',
        ],
      },
      {
        opcode: 'XOR',
        name: 'Bitwise XOR',
        example: 'XOR word l1, CX',
        description:
          'Used for performing bitwise XOR operation between operands',
        usage: [
          'XOR register , register',
          'XOR word_reg , word_reg',
          'XOR register , byte memory ',
          'XOR register , word memory ',
          'XOR register , byte label ',
          'XOR register , word label ',
          'XOR byte memory , byte-register ',
          'XOR word memory , word-register ',
          'XOR byte label , byte-register',
          'XOR word label , word-register',
          'XOR byte-register , unsigned byte number',
          'XOR word-register , unsigned word number  ',
          'XOR byte memory , unsigned byte number',
          'XOR word memory , unsigned word number',
          'XOR byte label , unsigned byte number',
          'XOR word label , unsigned word number',
        ],
      },
      {
        opcode: 'TEST',
        name: 'TEST',
        example: 'TEST AX, CX',
        description:
          'Performs AND operation, but does not store result, only update the flags',
        usage: [
          'TEST register , register',
          'TEST word_reg , word_reg',
          'TEST register , byte memory ',
          'TEST register , word memory ',
          'TEST register , byte label ',
          'TEST register , word label ',
          'TEST byte memory , byte-register ',
          'TEST word memory , word-register ',
          'TEST byte label , byte-register',
          'TEST word label , word-register',
          'TEST byte-register , unsigned byte number',
          'TEST word-register , unsigned word number  ',
          'TEST byte memory , unsigned byte number',
          'TEST word memory , unsigned word number',
          'TEST byte label , unsigned byte number',
          'TEST word label , unsigned word number',
        ],
      },
      {
        opcode: 'SHL/SAL',
        name: 'Shift Logical/Arithmetic Left',
        example: 'SHL AX',
        description: 'Shifts operand to left, filling the bits by 0',
        usage: [
          'SHL/SAL register , unsigned byte number',
          'SHL/SAL word-register , unsigned byte number',
          'SHL/SAL byte-register , CL',
          'SHL/SAL word-register , CL',
          'SHL/SAL byte memory , unsigned byte number',
          'SHL/SAL byte label , unsigned byte number',
          'SHL/SAL word label , unsigned byte number',
          'SHL/SAL word memory , unsigned byte number',
          'SHL/SAL byte memory , CL',
          'SHL/SAL word memory , CL',
          'SHL/SAL byte label , CL',
          'SHL/SAL word label , CL',
        ],
      },
      {
        opcode: 'SAR',
        name: 'Shift Arithmetic Right',
        example: 'SAR word l1',
        description: 'Shifts operand to right, filling the bits by MSB',
        usage: [
          'SAR register , unsigned byte number',
          'SAR word-register , unsigned byte number',
          'SAR byte-register , CL',
          'SAR word-register , CL',
          'SAR byte memory , unsigned byte number',
          'SAR byte label , unsigned byte number',
          'SAR word label , unsigned byte number',
          'SAR word memory , unsigned byte number',
          'SAR byte memory , CL',
          'SAR word memory , CL',
          'SAR byte label , CL',
          'SAR word label , CL',
        ],
      },
      {
        opcode: 'SHR',
        name: 'Shift Logical Right',
        example: 'SAR word [5]',
        description: 'Shifts operand to right, filling the bits by 0',
        usage: [
          'SHR register , unsigned byte number',
          'SHR word-register , unsigned byte number',
          'SHR byte-register , CL',
          'SHR word-register , CL',
          'SHR byte memory , unsigned byte number',
          'SHR byte label , unsigned byte number',
          'SHR word label , unsigned byte number',
          'SHR word memory , unsigned byte number',
          'SHR byte memory , CL',
          'SHR word memory , CL',
          'SHR byte label , CL',
          'SHR word label , CL',
        ],
      },
      {
        opcode: 'ROL',
        name: 'Rotate Left',
        example: 'ROL word [BP]',
        description: 'Rotates the operand in Left direction',
        usage: [
          'ROL register , unsigned byte number',
          'ROL word-register , unsigned byte number',
          'ROL byte-register , CL',
          'ROL word-register , CL',
          'ROL byte memory , unsigned byte number',
          'ROL byte label , unsigned byte number',
          'ROL word label , unsigned byte number',
          'ROL word memory , unsigned byte number',
          'ROL byte memory , CL',
          'ROL word memory , CL',
          'ROL byte label , CL',
          'ROL word label , CL',
        ],
      },
      {
        opcode: 'ROR',
        name: 'Rotate Right',
        example: 'ROR CX',
        description: 'Rotates the operand in Right direction',
        usage: [
          'ROR register , unsigned byte number',
          'ROR word-register , unsigned byte number',
          'ROR byte-register , CL',
          'ROR word-register , CL',
          'ROR byte memory , unsigned byte number',
          'ROR byte label , unsigned byte number',
          'ROR word label , unsigned byte number',
          'ROR word memory , unsigned byte number',
          'ROR byte memory , CL',
          'ROR word memory , CL',
          'ROR byte label , CL',
          'ROR word label , CL',
        ],
      },
      {
        opcode: 'RCL',
        name: 'Rotate Left Through Carry',
        example: 'RCL AL',
        description: 'Rotates the operand in Left direction through carry flag',
        usage: [
          'RCL register , unsigned byte number',
          'RCL word-register , unsigned byte number',
          'RCL byte-register , CL',
          'RCL word-register , CL',
          'RCL byte memory , unsigned byte number',
          'RCL byte label , unsigned byte number',
          'RCL word label , unsigned byte number',
          'RCL word memory , unsigned byte number',
          'RCL byte memory , CL',
          'RCL word memory , CL',
          'RCL byte label , CL',
          'RCL word label , CL',
        ],
      },
      {
        opcode: 'RCR',
        name: 'Rotate Right Through Carry',
        example: 'ROR byte l1',
        description:
          'Rotates the operand in Right direction through carry flag',
        usage: [
          'RCR register , unsigned byte number',
          'RCR word-register , unsigned byte number',
          'RCR byte-register , CL',
          'RCR word-register , CL',
          'RCR byte memory , unsigned byte number',
          'RCR byte label , unsigned byte number',
          'RCR word label , unsigned byte number',
          'RCR word memory , unsigned byte number',
          'RCR byte memory , CL',
          'RCR word memory , CL',
          'RCR byte label , CL',
          'RCR word label , CL',
        ],
      },
    ],
  },
  {
    name: 'Control Transfer',
    instructions: [
      {
        opcode: 'CALL',
        name: 'CALL',
        example: 'CALL fn1',
        description: 'Used to call a procedure.',
        usage: ['CALL proc_name'],
      },
      {
        opcode: 'RET',
        name: 'RET',
        example: 'RET',
        description: 'Used return from the procedures.',
        usage: ['RET'],
      },
      {
        opcode: 'Jumps',
        name: 'Jump instructions',
        example: 'JMP back',
        description:
          'Used for changing the flow of execution of instructions in the processor. opcodes supported are : jmp, ja, jnbe, jae, jnb, jb, jnae, jbe, jna, jc, je, jz, jg, jnle, jge, jnl, jl, jnge, jle, jng, jnc, jne, jnz, jno, jnp, jpo, jns, jo, jp, jpe, js, jcxz',
        usage: ['opcode label'],
      },
      {
        opcode: 'INT',
        name: 'Interrupt',
        example: 'INT 3',
        description: `Generates software interrupts. Supported interrupts are: 
          1) int 3: Can be used for debugging, displays user prompt.
          2) int 0x10 BIOS interrupts : value of AH allowed are : 0AH,13H . 0AH ignores BH & BL (page number and page attribute) . 13H ignores AL (write mode), BH & BL (page number and attributes), DH (row to print the string on), supports DL (column to print string on). 
          3) int 0x21 : value of AH allowed are : 1H,2H,0AH.`,
        usage: ['INT unsigned byte number'],
      },
      {
        opcode: 'INTO',
        name: 'Interrupt Service Routine',
        example: '--Not Supported--',
        description: '',
        usage: ['Not Supported'],
      },
      {
        opcode: 'IRET',
        name: 'Return from Interrupt Service Routine',
        example: '--Not Supported--',
        description: '',
        usage: ['Not Supported'],
      },
    ],
  },
  {
    name: 'Control',
    instructions: [
      {
        opcode: 'STC',
        name: 'STC',
        example: 'STC',
        description: 'Set carry flag CF to 1.',
        usage: ['STC'],
      },
      {
        opcode: 'CLC',
        name: 'CLC',
        example: 'CLC',
        description:
          'Clear Carry Flag: This instruction resets the carry flag CF to 0.',
        usage: ['CLC'],
      },
      {
        opcode: 'CMC',
        name: 'CMC',
        example: 'CMC',
        description: 'This instruction take complement of carry flag CF.',
        usage: ['CMC'],
      },
      {
        opcode: 'STD',
        name: 'STD',
        example: 'STD',
        description: 'Set direction flag to 1.',
        usage: ['STD'],
      },
      {
        opcode: 'CLD',
        name: 'CLD',
        example: 'CLD',
        description:
          'Clear Direction Flag: This instruction resets the direction flag DF to 0.',
        usage: ['CLD'],
      },
      {
        opcode: 'STI',
        name: 'STI',
        example: 'STI',
        description: 'Set interrupt flag IF to 1.',
        usage: ['STI'],
      },
      {
        opcode: 'CLI',
        name: 'CLI',
        example: 'CLI',
        description:
          'Clear Interrupt Flag: This instruction resets the interrupt flag IF to 0.',
        usage: ['CLI'],
      },
      {
        opcode: 'HLT',
        name: 'HLT',
        example: 'HLT',
        description: 'Halt processing. It stops program execution.',
        usage: ['HLT'],
      },
    ],
  },
  {
    name: 'String',
    instructions: [
      {
        opcode: 'MOVS',
        name: 'MOVS',
        example: 'MOVS byte',
        description: 'Used to move the byte/word from one string to another.',
        usage: ['MOVS byte', 'MOVS word'],
      },
      {
        opcode: 'LODS',
        name: 'LODS',
        example: 'LODS byte',
        description:
          'Used to store the string byte into AL or string word into AX, String is taken from DS:SI',
        usage: ['LODS byte', 'LODS word'],
      },
      {
        opcode: 'STOS',
        name: 'STOS',
        example: 'STOS byte',
        description:
          'Copies the data item from AL (for bytes), AX (for words) to the destination string, pointed to by ES:DI in memory.',
        usage: ['STOS byte', 'STOS word'],
      },
      {
        opcode: 'CMPS',
        name: 'CMPS',
        example: 'CMPS byte',
        description:
          'Compares two strings. This instruction compares two data items of one byte, word, pointed to by the DS:SI and ES:DI registers and sets the flags accordingly.',
        usage: ['CMPS byte', 'CMPS word'],
      },
      {
        opcode: 'SCAS',
        name: 'SCAS',
        example: 'SCAS byte',
        description:
          'Used for searching a particular character or set of characters in a string.',
        usage: ['SCAS byte', 'SCAS word'],
      },
      {
        opcode: 'REP',
        name: 'Repeat',
        example: 'REP MOVS byte',
        description:
          'Used to repeat the given instruction till CX ≠ 0. It supports MOVS, LODS and STOS.',
        usage: [
          'REP MOVS byte',
          'REP MOVS word',
          'REP LODS byte',
          'REP LODS word',
          'REP STOS byte',
          'REP STOS word',
        ],
      },
      {
        opcode: 'REPE / REPZ',
        name: 'Repeat if equal or zero',
        example: 'REPE CMPS byte',
        description:
          'Used to repeat the given instruction until CX = 0 or zero flag ZF = 0.Supports CMPS and SCAS',
        usage: [
          'REPE CMPS byte',
          'REPE CMPS word',
          'REPE SCAS byte',
          'REPE SCAS word',
          'REPZ CMPS byte',
          'REPZ CMPS word',
          'REPZ SCAS byte',
          'REPZ SCAS word',
        ],
      },
      {
        opcode: 'REPNE / REPNZ',
        name: 'Repeat if not equal or not zero',
        example: 'REPNE CMPS byte',
        description:
          'Used to repeat the given instruction until CX = 0 or zero flag ZF = 1.Supports CMPS and SCAS',
        usage: [
          'REPNE CMPS byte',
          'REPNE CMPS word',
          'REPNE SCAS byte',
          'REPNE SCAS word',
          'REPNZ CMPS byte',
          'REPNZ CMPS word',
          'REPNZ SCAS byte',
          'REPNZ SCAS word',
        ],
      },
    ],
  },
];
