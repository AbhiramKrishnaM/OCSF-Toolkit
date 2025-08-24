import AlertTriggerNode from './AlertTriggerNode';
import IoCLookupNode from './IoCLookupNode';
import DataEnrichmentNode from './DataEnrichmentNode';
import RagQueryNode from './RagQueryNode';
import ThreatScoringNode from './ThreatScoringNode';
import DecisionNode from './DecisionNode';
import BlockIpNode from './BlockIpNode';
import CreateTicketNode from './CreateTicketNode';
import SendNotificationNode from './SendNotificationNode';

export const nodeTypes = {
  'alert-trigger': AlertTriggerNode,
  'ioc-lookup': IoCLookupNode,
  'data-enrichment': DataEnrichmentNode,
  'rag-query': RagQueryNode,
  'threat-scoring': ThreatScoringNode,
  'decision': DecisionNode,
  'block-ip': BlockIpNode,
  'create-ticket': CreateTicketNode,
  'send-notification': SendNotificationNode
};
