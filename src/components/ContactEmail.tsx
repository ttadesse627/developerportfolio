import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

interface ContactEmailProps {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const ContactEmail = ({ 
  name, 
  email, 
  subject = "No Subject", 
  message 
}: ContactEmailProps) => {
  const previewText = `New message from ${name} via your portfolio`;

  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>{previewText}</Preview>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-10 px-4 max-w-2xl">
            {/* Header */}
            <Section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl p-8 text-center">
              <Heading className="text-black text-3xl font-bold m-0">
                ✨ New Portfolio Contact
              </Heading>
              <Text className="text-blue-100 text-lg mt-2">
                Someone reached out to you!
              </Text>
            </Section>

            {/* Main Content Card */}
            <Section className="bg-white rounded-b-xl shadow-lg p-8 border border-gray-200">
              {/* Sender Info */}
              <Section className="mb-8">
                <Heading as="h2" className="text-xl font-semibold text-gray-800 mb-4">
                  Sender Information
                </Heading>
                
                <Row className="mb-3">
                  <Column className="w-24">
                    <Text className="font-medium text-gray-600 m-0">Name:</Text>
                  </Column>
                  <Column>
                    <Text className="text-gray-900 font-semibold m-0">{name}</Text>
                  </Column>
                </Row>
                
                <Row className="mb-3">
                  <Column className="w-24">
                    <Text className="font-medium text-gray-600 m-0">Email:</Text>
                  </Column>
                  <Column>
                    <Text className="text-blue-600 font-medium m-0">
                      <a href={`mailto:${email}`} className="hover:underline">
                        {email}
                      </a>
                    </Text>
                  </Column>
                </Row>
                
                {subject && (
                  <Row>
                    <Column className="w-24">
                      <Text className="font-medium text-gray-600 m-0">Subject:</Text>
                    </Column>
                    <Column>
                      <Text className="text-gray-900 font-semibold m-0">{subject}</Text>
                    </Column>
                  </Row>
                )}
              </Section>

              {/* Message Section */}
              <Section>
                <Heading as="h2" className="text-xl font-semibold text-gray-800 mb-4">
                  Message
                </Heading>
                <Section className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r">
                  <Text className="text-gray-700 whitespace-pre-line leading-relaxed m-0">
                    {message}
                  </Text>
                </Section>
              </Section>

              {/* Footer */}
              <Section className="mt-10 pt-6 border-t border-gray-200">
                <Text className="text-gray-500 text-sm text-center m-0">
                  This email was sent from your portfolio contact form • {new Date().toLocaleDateString()}
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactEmail;